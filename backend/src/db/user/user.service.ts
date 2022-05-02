import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async insertUser(user: User): Promise<void> {
    // this.usersRepository.create({did: "12", identifier: "23"});
    await this.usersRepository.insert(user);
  }


  async findByDid(did: string): Promise<User> {
    // return this.usersRepository.findOne(did);
    return await this.usersRepository.findOne({where: {did: did} })
  }

  async deleteByHolderDID(did: string): Promise<void> {
    await this.usersRepository.delete({ did: did });
  }
}