import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  async getAllCountries(): Promise<string[]> {
    const countries: Country[] = await this.countriesRepository.find();
    
    const countryList: string[] = []

    countries.forEach(country => {
      countryList.push(country.name);
    });

    return countryList;//this.countriesRepository.find();
  }
}