import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('image')
export class ImageController {
  constructor() { }

  @Get('/:filename')
  async getImage(@Param('filename') filename: string, @Res() res): Promise<any> {
    res.sendFile(filename, {root: 'public/images'})    
  }
}
