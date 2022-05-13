import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DbService } from './db.service';
// import { AccessToken } from './AccessToken/access-token.entity';
// import { AccessTokenService } from './AccessToken/access-token.service';


import { NewUser } from './newUser/newuser.entity';
import { NewUserService } from './newUser/newuser.service';
import { NewUserController } from './newUser/newuser.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([NewUser]),
		AuthModule
	],
	controllers: [NewUserController],
	providers: [NewUserService, DbService],
	exports: [NewUserService, DbService]
})
export class DbModule { }
