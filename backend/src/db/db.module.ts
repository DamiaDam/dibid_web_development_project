import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User])
	],
	controllers: [UserController],
	providers: [UserService, DbService],
	exports: [UserService, DbService]
})
export class DbModule {}