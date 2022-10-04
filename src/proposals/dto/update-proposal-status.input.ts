import { CreateProposalInput } from './create-proposal.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { ProposalStatus } from 'src/graphql';
export class UpdateProposalStatusInput extends PartialType(
  CreateProposalInput,
) {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsEnum(ProposalStatus)
  status: ProposalStatus;
}
