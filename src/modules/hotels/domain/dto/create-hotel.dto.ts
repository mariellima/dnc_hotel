import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  address!: string;

  @IsNumber()
  @IsOptional()
  ownerId!: number;
}
