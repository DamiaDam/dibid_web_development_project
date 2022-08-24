import { Controller, Get, UseGuards } from '@nestjs/common';
import { Response as ExpressResponse } from "express";
import { AdminAuthGuard } from 'src/adminAuth/adminAuth.guard';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) { }

  @Get()
  @UseGuards(AdminAuthGuard)
  async export() {

    await this.exportService.exportAllItems();
    return {};
  }

  // @Get('/:filename')
  // @UseGuards(AdminAuthGuard)
  // async serveFile(@Response() res: ExpressResponse, @Param('filename') filename: string): Promise<ExpressResponse> {
  //   return await this.exportService.getExportedFile(filename).then(async (file) => {
  //     res.set("Content-Type", "text/csv");

  //     await this.expService.deleteFile('storage/exported-dids/'+filename)

  //     return res.send(file);
  //   })
  // }
}
