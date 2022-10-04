import {
  IsEthereumAddress,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class LoginProfileInput {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEthereumAddress()
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  signature: string;

  @IsOptional()
  @IsString()
  picture = '';

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  email: string;
}
