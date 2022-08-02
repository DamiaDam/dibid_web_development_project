import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryInterface } from 'src/dto/categories.dto';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getAllCategoriesStr(): Promise<string[]> {
    const categories: Category[] = await this.categoriesRepository.find();
    
    const categoryList: string[] = []

    categories.forEach(category => {
      categoryList.push(category.name);
    });

    return categoryList;//this.categoriesRepository.find();
  }

  async getAllCategoriesId(): Promise<CategoryInterface[]> {
    const categories: Category[] = await this.categoriesRepository.find();
    
    const categoryList: CategoryInterface[] = []

    categories.forEach(category => {
      categoryList.push({id: category.id, name: category.name});
    });

    return categoryList;
  }

  // Get a Category object when you know its ID
  async getCategoryById(id: number ): Promise<Category> {
    return await this.categoriesRepository.findOneBy({ id: id })
  }

  // Get a Category ID when you know its name
  async getCategoryIdByName(name: string ): Promise<number> {

    const category = await this.categoriesRepository.findOneBy({ name: name });
    return category.id;
  }

  // Get a list of Category objects from a list of Category IDs
  async getCategoriesById (categories: number[]): Promise<Category[]> {

    const Categories: Category[] = []

    for (const id of categories) {
      Categories.push(await this.getCategoryById(id))
    }
    
    return Categories;
  }

  // Get a list of Category IDs from a list of objects
  getCategoryIDsFromObjects(categories: Category[]): number[] {
    
    const Categories: number[] = [];

    for (const category of categories) {
      Categories.push(category.id)
    }

    return Categories;
  }

  // Get a list of Category IDs from a product ID
  async getProductCategories(productId: number): Promise<number[]> {

    const Categories: number[] = [];

    const categories: Category[] = await this.categoriesRepository
      .createQueryBuilder("categories")
      .leftJoinAndSelect("categories.products", "products")
      .where("products.productId = :productId", { productId: productId })
      .getMany();
    
    categories.forEach(category => {
      Categories.push(category.id)
    });

    return Categories;
  }
}