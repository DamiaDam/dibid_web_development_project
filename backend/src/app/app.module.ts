import { Module } from '@nestjs/common';
import { LoginController } from 'src/login/login.controller';
import { LoginService } from 'src/login/login.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from '../db/db.service';
import { DbModule } from '../db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UAuthModule } from 'src/uauth/uauth.module';
import { NewUser } from 'src/db/newUser/newuser.entity'
import { NewUserService } from 'src/db/newUser/newuser.service';
import { RegisterController } from 'src/register/register.controller';
import { RegisterService } from 'src/register/register.service';
import { Country } from 'src/db/country/country.entity';
import { CountryService } from 'src/db/country/country.service';
import { CountryController } from 'src/db/country/country.controller';
import { ProductItem } from 'src/db/productItem/productItem.entity';
import { ProductItemController } from 'src/db/productItem/productItem.controller';
import { ProductItemService } from 'src/db/productItem/productItem.service';
import { NewUserController } from 'src/db/newUser/newuser.controller';

const DB_NAME = 'db';

@Module({
  imports: [
    DbModule,
    UAuthModule,
    TypeOrmModule.forFeature(
      [NewUser, Country, ProductItem],
    ),
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController, LoginController, RegisterController, NewUserController, CountryController, ProductItemController],
  providers: [AppService, LoginService, RegisterService, NewUserService, CountryService, ProductItemService],
})
export class AppModule { }
