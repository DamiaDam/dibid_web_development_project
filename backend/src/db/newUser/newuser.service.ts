import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoDTO } from 'src/dto/create-user.dto';
import { ValidateDTO, ValidateResponseDTO } from 'src/dto/user-dto.interface';
import { Repository } from 'typeorm';
import { ProductItem } from '../productItem/productItem.entity';
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

  findAdmins(): Promise<NewUser[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('users.admin = :adminFlag', { adminFlag: '1' })
      .getMany();
  }

  findValidatedUsers(): Promise<NewUser[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('users.validated = :val', { val: '1' })
      .getMany();
  }

  findNonValidatedUsers(): Promise<NewUser[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('users.validated = :val', { val: '0' })
      .getMany();
  }

  async insertUser(user: NewUser): Promise<void> {
    // this.usersRepository.create({did: "12", identifier: "23"});
    await this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<NewUser> {
    return await this.usersRepository
      .createQueryBuilder("users")
      .where("users.username = :username", { username: username })
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
      validated: user.validated,
      admin: user.admin,
      latitude: user.latitude,
      longitude: user.longitude,
    };

    return userInfo;
  }

  async validateUser(User: ValidateDTO): Promise<ValidateResponseDTO> {
    await this.usersRepository
      .createQueryBuilder()
      .update("users")
      .set({ validated: true })
      .where("users.username = :username", { username: User.username })
      .execute();
    return { success: true };
  }

  async connectUserToProduct(username: string, product: ProductItem): Promise<void> {
    await this.usersRepository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.products", "product")
      .where("users.username = :username", { username: username })
    return;
  }
}