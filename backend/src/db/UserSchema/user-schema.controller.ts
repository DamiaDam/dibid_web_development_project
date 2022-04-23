import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserSchema } from './user-schema.entity';
import { UserSchemaService } from './user-schema.service';


@Controller('user')
export class AccessTokenController {
  constructor(private readonly userSchemaService: UserSchemaService) {}


  // @Post()
  // async get(@Req() req) {  // also deletes the access token
  //   console.log('user requested');
  //   const did: string = req.did;
  //   console.log('did = ', did)
  //   const u: UserSchema = await this.userSchemaService.findByDid(did);
  //   this.userSchemaService.deleteByDid(did);
  //   return u.sk;
  // }

}

