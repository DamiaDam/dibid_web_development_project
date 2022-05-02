import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewUser } from './newuser.entity';

@Injectable()
export class NewUserService {
  constructor(
    @InjectRepository(NewUser)
    private usersRepository: Repository<NewUser>,
  ) {}

  findAll(): Promise<NewUser[]> {
    return this.usersRepository.find();
  }

  async insertUser(user: NewUser): Promise<void> {
    // this.usersRepository.create({did: "12", identifier: "23"});
    await this.usersRepository.insert(user);
  }

  async findByUsername(username: string): Promise<NewUser> {
    // return this.usersRepository.findOne(did);
    return await this.usersRepository.findOne({where: {username: username} })
  }

  async deleteByUsername(username: string): Promise<void> {
    await this.usersRepository.delete({ username: username });
  }
}