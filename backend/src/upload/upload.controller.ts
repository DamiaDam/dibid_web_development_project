import { Controller, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor() { }

  @Post('/')
  @UseInterceptors(FileInterceptor('file', { dest: 'public/images' }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {path: file.path};
    }

}
