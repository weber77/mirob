import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';
import { ProposalStatus } from '../entities/proposal.entity';

export class ListProposalsInput {
  @IsString()
  @IsOptional()
  search = '';

  @IsOptional()
  @IsEnum(ProposalStatus)
  status: ProposalStatus;

  @IsOptional()
  @IsPositive()
  @Max(20)
  pageSize = 10;

  @IsOptional()
  @IsNumber()
  pageNum = 0;
}
