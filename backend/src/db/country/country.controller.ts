import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './country.entity';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  // 'getAll()' returns the list of all the existing countries in the database
  @Get('getall')
  async getAll() {
    return await this.countryService.getAllCountries();
  }

  // 'getCountryById(id)' returns the country object of the country with given id
  @Get('/get/:id')
  async getCountryById(
    @Param('id') id: string
  ): Promise<Country> {
    return await this.countryService.getCountryById(+id);
  }

}
