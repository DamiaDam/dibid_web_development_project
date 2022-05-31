import { Body, Controller, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

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

}
