import { Body, Controller, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './country.entity';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  // 'getAll()' returns the list of all the existing users in the database
  @Get('getall')
  async getAll() {

    return await this.countryService.getAllCountries();
  }

}
