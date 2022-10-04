import { CreateProposalInput } from './create-proposal.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID, IsNotEmpty } from 'class-validator';
export class UpdateProposalInput extends PartialType(CreateProposalInput) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
