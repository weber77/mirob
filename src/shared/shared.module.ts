import { Module } from '@nestjs/common';
import { ExceptionService } from './services/exception.service';
import { SharedService } from './services/shared.service';
import { SharedController } from './shared.controller';

@Module({
  providers: [SharedService, ExceptionService],
  controllers: [SharedController],
  exports: [SharedService, ExceptionService],
})
export class SharedModule {}
