import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('image')
export class ImageController {
  constructor() { }

  @Get('/')
  async getImage(@Param('path') path: string) {
    
  }
  // async getFile(@Param('bucketname') bucketName: string, @Param('filename') fileName: string, @Res() response) {
  //     return (await this.appService.getFile(bucketName, fileName)).pipe(response);
  //   }


}
