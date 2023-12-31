import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoDTO } from 'src/dto/create-user.dto';
import { ValidateDTO, ValidateResponseDTO } from 'src/dto/user-dto.interface';
import { Repository } from 'typeorm';
import { Message } from '../messages/messages.entity';
import { MessageService } from '../messages/messages.service';
import { ProductItem } from '../productItem/productItem.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findAdmins(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('users.admin = :adminFlag', { adminFlag: '1' })
      .getMany();
  }

  findValidatedUsers(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('users.validated = :val', { val: '1' })
      .getMany();
  }

  findNonValidatedUsers(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('users.validated = :val', { val: '0' })
      .getMany();
  }

  async insertUser(user: User): Promise<void> {
    // this.usersRepository.create({did: "12", identifier: "23"});
    await this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder("users")
      .where("users.username = :username", { username: username })
      .getOne();

  }

  async deleteByUsername(username: string): Promise<void> {
    await this.usersRepository.delete({ username: username });
  }

  getInfoFromUser(user: User): UserInfoDTO {
    if (user.latitude == null)
      user.latitude = -1;
    if (user.longitude == null)
      user.longitude = -1;

    const userInfo: UserInfoDTO = {
      name: user.name,
      address: user.address,
      countryId: user.countryId,
      email: user.email,
      surname: user.surname,
      phone: user.phone,
      tin: user.tin,
      username: user.username,
      validated: user.validated,
      admin: user.admin,
      bidderRating: user.bidderRating,
      sellerRating: user.sellerRating,
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

  async increaseBidderRating(user: User) {
    await this.usersRepository
      .createQueryBuilder()
      .update(user)
      .set({ bidderRating: () => "bidderRating + 1" })
      .execute();
  }

  async increaseSellerRating(user: User) {
    await this.usersRepository
      .createQueryBuilder()
      .update(user)
      .set({ sellerRating: () => "sellerRating + 1" })
      .execute();
  }

  async connectUserToMessage(senderUsername: string, receiverUsername: string, newMessage: Message): Promise<void> {
    await this.usersRepository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.SentMessages", "newMessage")
      .where("users.username = :username", { username: senderUsername })
      .execute();
    await this.usersRepository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.ReceivedMessages", "newMessage")
      .where("users.username = :username", { username: receiverUsername })
      .execute();

    var rr = await this.usersRepository.createQueryBuilder('users').where("users.username = :username", { username: receiverUsername }).getOne();
    console.log(rr.ReceivedMessages);
    return;
  }


  async updateLastMessageAccess(username: string): Promise<{ success: boolean }> {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .update("users")
        .set({ lastAccessedMessages: new Date() })
        .where("users.username = :username", { username: username })
        .execute();
      return { success: true };
    } catch {
      return { success: false };
    }
  }
}