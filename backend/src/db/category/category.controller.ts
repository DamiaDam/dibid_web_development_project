import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryInterface } from 'src/dto/categories.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // 'getAllStr()' returns the list of all the existing category names in the database
  @Get('getallstr')
  async getAllStr() {

    return await this.categoryService.getAllCategoriesStr();
  }

  // 'getAllId()' returns the list of all the existing categories (incl. their IDs) in the database
  @Get('getall')
  async getAllWithId() {

    return await this.categoryService.getAllCategoriesId();
  }

  // 'get/id' returns the category with the given id
  @Get('get/:id')
  async getCategoryWithId(
    @Param('id') id: string
  ): Promise<Category> {
    return await this.categoryService.getCategoryById(+id);
  }

  // 'product/id' returns a list of categories for the given product with given id
  @Get('product/:id')
  async getCategoriesOfProductWithId(
    @Param('id') id: string
  ): Promise<CategoryInterface[]> {
    return await this.categoryService.getProductCategoryInterface(+id);
  }

}
