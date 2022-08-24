import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [ExportController],
  providers: [ExportService],
  exports: [ExportService]
})
export class ExportModule { }