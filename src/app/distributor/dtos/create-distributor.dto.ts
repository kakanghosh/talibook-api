import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDistributorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
