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

  async getAllCountries(): Promise<Country[]> {
    return await this.countriesRepository.find();
  }

  async getCountryById(id: number): Promise<Country> {
    return await this.countriesRepository.findOneBy({ id: id })
  }
}