import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '../db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/user/user.entity'
import { UserService } from 'src/db/user/user.service';
import { RegisterController } from 'src/register/register.controller';
import { RegisterService } from 'src/register/register.service';
import { Country } from 'src/db/country/country.entity';
import { CountryService } from 'src/db/country/country.service';
import { CountryController } from 'src/db/country/country.controller';
import { ProductItem } from 'src/db/productItem/productItem.entity';
import { ProductItemController } from 'src/db/productItem/productItem.controller';
import { ProductItemService } from 'src/db/productItem/productItem.service';
import { UserController } from 'src/db/user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { LoginController } from 'src/login/login.controller';
import { LoginService } from 'src/login/login.service';
import { BidService } from 'src/db/bid/bid.service';
import { BidController } from 'src/db/bid/bid.controller';
import { Bid } from 'src/db/bid/bid.entity';

const DB_NAME = 'db';

@Module({
  imports: [
    DbModule,
    AuthModule,
    TypeOrmModule.forFeature(
      [User, Country, ProductItem, Bid],
    ),
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController, LoginController, RegisterController, UserController, CountryController, ProductItemController, BidController],
  providers: [AppService, LoginService, RegisterService, UserService, CountryService, ProductItemService, BidService],
})
export class AppModule { }
