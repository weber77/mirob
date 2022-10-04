import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsResolver } from './threads.resolver';
import { Thread } from './entities/thread.entity';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Thread]), SharedModule],
  providers: [ThreadsResolver, ThreadsService],
})
export class ThreadsModule {}
