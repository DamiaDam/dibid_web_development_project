import { Controller, Get, Param, Response, UseGuards } from '@nestjs/common';
import { Response as ExpressResponse } from "express";
import { AdminAuthGuard } from 'src/adminAuth/adminAuth.guard';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) { }

  @Get()
  @UseGuards(AdminAuthGuard)
  async export() {

    return await this.exportService.exportAllItems();
  }

  @Get('/:filename')
  async serveFile(@Response() res: ExpressResponse, @Param('filename') filename: string): Promise<ExpressResponse> {
    
    console.log('param: ', filename);

    return await this.exportService.getExportedFile(filename).then(async (file) => {
      res.set("Content-Type", "text/csv");

      await this.exportService.deleteFile('storage/exports/'+filename)

      return res.send(file);
    })
  }
}
