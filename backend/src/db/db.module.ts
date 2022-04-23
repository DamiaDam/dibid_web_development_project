import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DbService } from './db.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
// import { AccessToken } from './AccessToken/access-token.entity';
// import { AccessTokenService } from './AccessToken/access-token.service';

import { AccessTokenController } from './UserSchema/user-schema.controller';
import { UserSchema } from './UserSchema/user-schema.entity';
import { UserSchemaService } from './UserSchema/user-schema.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserSchema]),
		AuthModule
	],
	controllers: [AccessTokenController],
	providers: [UserSchemaService, DbService],
	exports: [UserSchemaService, DbService]
})
export class DbModule {}
