import { Module } from '@nestjs/common';
import { LoginController } from 'src/login/login.controller';
import { LoginService } from 'src/login/login.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from '../db/db.service';
import { DbModule } from '../db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/user/user.entity';

const DB_NAME = 'db';

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService],
})
export class AppModule {}
