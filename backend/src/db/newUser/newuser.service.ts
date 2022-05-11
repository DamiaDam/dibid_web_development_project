import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoDTO } from 'src/dto/create-user.dto';
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
    console.log({"username": username})
    console.log(username)
    return await this.usersRepository.findOne({where: {"username": username} })
  }

  async deleteByUsername(username: string): Promise<void> {
    await this.usersRepository.delete({ username: username });
  }

  getInfoFromUser(user: NewUser): UserInfoDTO {
    var userInfo: UserInfoDTO;

    userInfo.address = user.address;
    userInfo.country = user.country;
    userInfo.email = user.email;
    userInfo.name = user.name;
    userInfo.surname = user.surname;
    userInfo.phone = user.phone;
    userInfo.tin = user.tin;
    userInfo.username = user.username;
    userInfo.latitude = user.latitude;
    userInfo.longitude = user.longitude;

    return userInfo;
  }
}