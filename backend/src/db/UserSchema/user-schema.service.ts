import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from './user-schema.entity';

@Injectable()
export class UserSchemaService {
  constructor(
    @InjectRepository(UserSchema)
    private userSchemaRepository: Repository<UserSchema>,
  ) {}

  findAll(): Promise<UserSchema[]> {
    return this.userSchemaRepository.find();
  }

  // async insertUser(usr: UserSchema): Promise<void> {
  //   // this.usersRepository.create({did: "12", identifier: "23"});

  //   // delete previous, and then insert a new one
  //   // await this.userSchemaRepository.delete({ did: usr.did });
  //   // this.userSchemaRepository.update({did: usr.did}, {sk: usr.sk});
  //   console.log('at from DBBBBBBBBBB = ', usr);
  //   const existent = await this.userSchemaRepository.findOne({did: usr.did});
  //   if (existent == null)
  //     this.userSchemaRepository.insert(usr);
  //   else {
  //     throw new Error('Cannot add a user into the database. The user with did ' + usr.did +
  //       " already exists in the database!");
  //   }
  // }

  async findByUsername(username: string): Promise<UserSchema> {
    return await this.userSchemaRepository.findOne(null, {where: {username: username} })
  }

  async deleteByUsername(username: string): Promise<void> {
    await this.userSchemaRepository.delete({username: username});
  }
}