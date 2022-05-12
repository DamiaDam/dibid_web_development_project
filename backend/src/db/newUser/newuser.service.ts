import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoDTO } from 'src/dto/create-user.dto';
import { Repository } from 'typeorm';
import { getManager } from "typeorm";
import { NewUser } from './newuser.entity';

@Injectable()
export class NewUserService {
  constructor(
    @InjectRepository(NewUser)
    private usersRepository: Repository<NewUser>,
  ) { }

  findAll(): Promise<NewUser[]> {
    return this.usersRepository.find();
  }

  async insertUser(user: NewUser): Promise<void> {
    // this.usersRepository.create({did: "12", identifier: "23"});
    await this.usersRepository.insert(user);
  }

  async findByUsername(username: string): Promise<NewUser> {
    return await this.usersRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .getOne();

  }

  async deleteByUsername(username: string): Promise<void> {
    await this.usersRepository.delete({ username: username });
  }

  getInfoFromUser(user: NewUser): UserInfoDTO {
    if (user.latitude == null)
      user.latitude = -1;
    if (user.longitude == null)
      user.longitude = -1;

    const userInfo: UserInfoDTO = {
      name: user.name,
      address: user.address,
      country: user.country,
      email: user.email,
      surname: user.surname,
      phone: user.phone,
      tin: user.tin,
      username: user.username,
      latitude: user.latitude,
      longitude: user.longitude,
    };

    return userInfo;
  }
}