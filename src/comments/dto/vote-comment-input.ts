import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export enum VoteStatus {
  UP = 'UP',
  DOWN = 'DOWN',
}

export class VoteCommentInput {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  profile: string;

  @IsNotEmpty()
  @IsEnum(VoteStatus)
  status: VoteStatus;
}
