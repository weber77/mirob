import { Module } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsResolver } from './proposals.resolver';
import { Proposal } from './entities/proposal.entity';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal]), SharedModule],
  providers: [ProposalsResolver, ProposalsService],
})
export class ProposalsModule {}
