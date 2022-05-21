import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DbService } from './db.service';
// import { AccessToken } from './AccessToken/access-token.entity';
// import { AccessTokenService } from './AccessToken/access-token.service';


import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		AuthModule
	],
	controllers: [UserController],
	providers: [UserService, DbService],
	exports: [UserService, DbService]
})
export class DbModule { }
