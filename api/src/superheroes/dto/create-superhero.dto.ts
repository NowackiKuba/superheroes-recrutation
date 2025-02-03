import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  superpower: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  humility: number;
}
