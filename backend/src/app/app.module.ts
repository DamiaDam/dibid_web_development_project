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
import { AuthModule } from 'src/auth/auth.module';
import { LoginController } from 'src/login/login.controller';
import { LoginService } from 'src/login/login.service';
import { BidService } from 'src/db/bid/bid.service';
import { BidController } from 'src/db/bid/bid.controller';
import { Bid } from 'src/db/bid/bid.entity';
import { Category } from 'src/db/category/category.entity';
import { CategoryController } from 'src/db/category/category.controller';
import { CategoryService } from 'src/db/category/category.service';
import { ExportController } from 'src/export/export.controller';
import { ExportService } from 'src/export/export.service';
import { UploadController } from 'src/upload/upload.controller';
import { ImageController } from 'src/image/image.controller';
import { Message } from 'src/db/messages/messages.entity';
import { MessageService } from 'src/db/messages/messages.service';
import { MessageController } from 'src/db/messages/messages.controller';
import { RecommendationsController } from 'src/recommendations/recommendations.controller';
import { RecommendationsService } from 'src/recommendations/recommendations.service';
import { xMatrix } from 'src/db/xmatrix/xmatrix.entity';
import { XMatrixService } from 'src/db/xmatrix/xmatrix.service';
import { xMatrixPred } from 'src/db/xmatrixpred/xmatrixpred.entity';
import { XMatrixPredService } from 'src/db/xmatrixpred/xmatrixpred.service';
const ormSettings = require('../../ormconfig.json');

@Module({
  imports: [
    DbModule,
    AuthModule,
    TypeOrmModule.forFeature(
      [Bid, Category, Country, ProductItem, User, Message, xMatrix, xMatrixPred],
    ),
    TypeOrmModule.forRoot(ormSettings),
  ],
  controllers: [AppController, LoginController, RegisterController, UserController, CountryController, ProductItemController, BidController, CategoryController, ExportController, UploadController, ImageController, MessageController, RecommendationsController],
  providers: [AppService, LoginService, RegisterService, UserService, CountryService, ProductItemService, BidService, CategoryService, ExportService, MessageService, RecommendationsService, XMatrixService, XMatrixPredService],
})
export class AppModule { }
