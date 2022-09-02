import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { ProductResponse, SearchProps } from 'src/dto/product.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { ProductItem } from './productItem.entity';

@Injectable()
export class ProductItemService {
  constructor(
    @InjectRepository(ProductItem)
    private productRepository: Repository<ProductItem>,
    private readonly categoryService: CategoryService,
    private readonly authService: AuthService
  ) { }

  async getProductById(id: number): Promise<ProductResponse> {

    const product: ProductItem = await this.productRepository
    .createQueryBuilder("products")
    .leftJoinAndSelect("products.seller", "user")
    .leftJoinAndSelect("products.categories", "categories")
    .where("products.productId = :productId", { productId: id })
    .getOne();

    if (product) {

      return {
        productId: id,
        name: product.name,
        categories: await this.categoryService.getProductCategories(product.productId),
        imgUrl: product.imgUrl,
        currentBid: product.currentBid,
        buyPrice: product.buyPrice,
        firstBid: product.firstBid,
        numberOfBids: product.numberOfBids,
        startingDate: product.startingDate,
        endingDate: product.endingDate,    
        description: product.description,
        location: product.location,
        longitude: product.longitude,
        latitude: product.latitude,
        seller: product.seller.username,
        sellerRating: product.seller.sellerRating
      }
    }
    else {
      return {
        productId: -1,
        name: "",
        categories: [],
        imgUrl: "",
        currentBid: 0,
        buyPrice: 0,
        firstBid: 0,
        numberOfBids: 0,
        startingDate: 0,
        endingDate: 0,    
        description: "",
        location: "",
        longitude: 0,
        latitude: 0,
        seller: "",
        sellerRating: 0
      }
    }
  }

  async getProductEntityById(id: number): Promise<ProductItem> {
    return await this.productRepository.findOneBy({ productId: id })
  }

  async getAllProductIds(): Promise<number[]> {
    const res: number[] = []
    const products: ProductItem[] =  await this.productRepository.find();
    products.forEach(product => {
      res.push(product.productId);
    });
    return res;
  }

  async getAllActiveIds(): Promise<number[]> {
    const res: number[] = []
    const products: ProductItem[] =  await this.productRepository.findBy({active: true});
    products.forEach(product => {
      res.push(product.productId);
    });
    return res;
  }

  async getAllActiveProducts(): Promise<ProductItem[]> {
    return await this.productRepository.findBy({active: true});
  }

  async getAllProducts(): Promise<ProductItem[]> {
    // return await this.productRepository.find();

    const products: ProductItem[] = await this.productRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.seller", "user")
      .getMany();

    return products;
  }

  // Set all items that have expired to active: false
  async updateAllActiveProducts(): Promise<void> {

    const time: number = +new Date();

    await this.productRepository
      .createQueryBuilder()
      .update('products')
      .set({active: false})
      .where('products.active = true')
      .andWhere('products.endingDate < :endingDate', {endingDate: time})
      .execute();
  }

  async insertProduct(product: ProductItem, username: string): Promise<{ 'success': boolean }> {
    console.log('test!!!');
    await this.productRepository.save(product);
    // await this.UserService.connectUserToProduct(username, product);
    return { "success": true }
  }

  async updateItemAfterBid(productId: number, bid: number): Promise<{ 'success': boolean }> {

    const product: ProductItem = await this.getProductEntityById(productId);
    const numberOfBids: number = product.numberOfBids + 1;

    await this.productRepository
      .createQueryBuilder()
      .update("products")
      .set({ numberOfBids: numberOfBids, currentBid: bid, active: bid !== product.buyPrice })
      .where("products.productId = :productId", { productId: productId })
      .execute();
    return { success: true };
  }

  // Get a list of Product IDs from a category ID
  async getCategoryProducts(categoryId: number): Promise<number[]> {

    const Products: number[] = [];
    
    const products = await this.productRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.categories", "categories")
      .where("categories.id = :categoryId", { categoryId: categoryId })
      .getMany();

      products.forEach(product => {
        Products.push(product.productId)
      });
      return Products;
  }

  // Get a list of active Product IDs from a category ID
  async getActiveCategoryProducts(categoryId: number): Promise<number[]> {

    const Products: number[] = [];
    
    const products = await this.productRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.categories", "categories")
      .where("categories.id = :categoryId", { categoryId: categoryId })
      .andWhere('products.active = 1')
      .getMany();

      products.forEach(product => {
        Products.push(product.productId)
      });
      return Products;
  }

  // Get a list of Product IDs from a user ID
  async getProductsByUserWithId(userId: string): Promise<number[]> {
    const Products: number[] = [];

    const products = await this.productRepository
      .createQueryBuilder('products')
      .where('products.seller = :userId', { userId: userId })
      .getMany();

    products.forEach(product => {
      Products.push(product.productId)
    });
    return Products;
  }

  // Get a list of Product IDs from a search text, ordered by relevance
  async searchProducts(props: SearchProps): Promise<number[]> {
    const Products: number[] = [];

    console.log('propas: ', props);

    var products: ProductItem[];
    var query: SelectQueryBuilder<ProductItem>;

    var searchText: string = ""
    if(props.searchText)
      searchText = props.searchText;

    // 1. Search titles like full searchText string
    query = this.productRepository
      .createQueryBuilder('products')
      .where('products.name LIKE :searchText', { searchText: '%' + searchText + '%' });
    products = await this.enhanceSearchQuery(query, props).getMany();
    
    for (const product of products) {
      Products.push(product.productId);
    }

    // 2. Search descriptions like full searchText string
    query = this.productRepository
      .createQueryBuilder('products')
      .where('products.description like :searchText', { searchText: '%' + searchText + '%' });
    products = await this.enhanceSearchQuery(query, props).getMany();
    
    for (const product of products) {
      if ( !Products.includes(product.productId) )
        Products.push(product.productId);
    }

    const TitleProducts: number[] = [];
    const DescProducts: number[] = [];
    const LocationProducts: number[] = [];
    if(props.searchText) {
      // 3. Split searchText in terms with length > 2
      const searchSplit: string[] = props.searchText.split(' ');

      const isLongEnough = (str: string) => {
        return str.length > 2;
      }

      const searchTerms = searchSplit.filter(isLongEnough);

      // 4. For each term:
      for (const term of searchTerms) {

        console.log('term: ', term);
        
        // 4.1. Search titles like term
        query = this.productRepository
          .createQueryBuilder('products')
          .where('products.name LIKE :term', { term: '%' + term + '%' });
        products = await this.enhanceSearchQuery(query, props).getMany();

        for (const product of products) {
          if ( !TitleProducts.includes(product.productId) )
            TitleProducts.push(product.productId);
        }

        // 4.2. Search descriptions like term
        query = this.productRepository
          .createQueryBuilder('products')
          .where('products.description LIKE :term', { term: '%' + term + '%' });
        products = await this.enhanceSearchQuery(query, props).getMany();
        
        for (const product of products) {
          if ( !DescProducts.includes(product.productId) )
            DescProducts.push(product.productId);
        }

        // 4.3. Search for location = term (TODO)
        query = this.productRepository
          .createQueryBuilder('products')
          .where('products.location LIKE :term', { term: '%' + term + '%' });
        products = await this.enhanceSearchQuery(query, props).getMany();

        for (const product of products) {
          if ( !LocationProducts.includes(product.productId) )
            LocationProducts.push(product.productId);
        }
    }

  }

    for (const product of TitleProducts) {
      if ( !Products.includes(product) )
        Products.push(product);
    }

    for (const product of DescProducts) {
      if ( !Products.includes(product) )
        Products.push(product);
    }

    for (const product of LocationProducts) {
      if ( !Products.includes(product) )
        Products.push(product);
    }

    console.log('Products: ', Products);
    return Products;
  }

  enhanceSearchQuery (query: SelectQueryBuilder<ProductItem>, props: SearchProps): SelectQueryBuilder<ProductItem> {

    let enhancedQuery: SelectQueryBuilder<ProductItem> = query;

    // Handle minBid/maxBid
    if (props.minBid && props.maxBid)
      enhancedQuery = enhancedQuery
        .andWhere('products.currentBid BETWEEN :minBid AND :maxBid', {minBid: props.minBid, maxBid: props.maxBid})
    else if (props.minBid && !props.maxBid)
      enhancedQuery = enhancedQuery
        .andWhere('products.currentBid >= :minBid', {minBid: props.minBid})
    else if (!props.minBid && props.maxBid)
      enhancedQuery = enhancedQuery
          .andWhere('products.currentBid <= :maxBid', {maxBid: props.maxBid})
    
    // Handle minBuyNow/maxBuyNow
    if (props.minBuyNow && props.maxBuyNow)
      enhancedQuery = enhancedQuery
        .andWhere('products.buyPrice BETWEEN :minBuyNow AND :maxBuyNow', {minBuyNow: props.minBuyNow, maxBuyNow: props.maxBuyNow})
    else if (props.minBuyNow && !props.maxBuyNow)
      enhancedQuery = enhancedQuery
        .andWhere('products.buyPrice >= :minBuyNow', {minBuyNow: props.minBuyNow})
    else if (!props.minBuyNow && props.maxBuyNow)
      enhancedQuery = enhancedQuery
          .andWhere('products.buyPrice <= :maxBuyNow', {maxBuyNow: props.maxBuyNow})

    // Handle category
    if (props.category) {
      enhancedQuery = enhancedQuery
        .leftJoinAndSelect("products.categories", "categories")
        .andWhere("categories.id = :categoryId", { categoryId: props.category })
    }

    return enhancedQuery;
  }

  async deleteProductById(id: number) {

    try {

      this.productRepository
          .createQueryBuilder('products')
          .delete()
          .from(ProductItem)
          .where("productId = :productId", {productId: id})
          .execute();

      return {'success': true, 'info': `Item ${id} deleted successfully`};
    }
    catch {
      return {'success': false, 'info': 'Error deleting item'};
    }

  }

  async editProduct(product: ProductItem): Promise<{success: boolean}> {
    await this.productRepository
      .createQueryBuilder()
      .update("products")
      .where("products.productId = :productId", { productId: product.productId })
      .set({ 
        name: product.name,
        buyPrice: product.buyPrice,
        firstBid: product.firstBid,
        currentBid: product.currentBid,
        description: product.description,
        location: product.location,
        longitude: product.longitude,
        latitude: product.latitude
      })
      .execute();

    // const oldCats: number[] = await this.categoryService.getProductCategories(product.productId);
    // const addedCats: number[] = [];
    // const deletedCats: number[] = [];
    // for (const cat of categories) {
    //   if(!oldCats.includes(cat)) {
    //     addedCats.push(cat);
    //   }
    // }
    // for (const cat of oldCats) {
    //   if(!categories.includes(cat)) {
    //     deletedCats.push(cat);
    //   }
    // }
    // const cata = await this.categoryService.getCategoriesById(categories);
    //  await this.productRepository.update(
    //   {productId: product.productId
    //   }, {categories: cata});



    return {success: true};
  }

  async isSeller(id: number, headers: any) {

    let token: string = ""
    try {
      token = headers.split(" ")[1];
    }
    catch {
      return false;
    }

    const username = this.authService.getUsername(token);

    const product: ProductItem = await this.productRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.seller", "user")
      .where('products.productId = :productId', { productId: id })
      .getOne();

    if(product.seller.username !== username) {
      return false;
    }

    return true;

  }
}