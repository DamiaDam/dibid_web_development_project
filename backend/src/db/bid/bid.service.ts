import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './bid.entity';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>,
  ) {}

  async submitBid(bid: Bid): Promise<void> {
    await this.bidsRepository.save(bid);
  }
}