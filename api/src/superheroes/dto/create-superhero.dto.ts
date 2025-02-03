import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

/**
 * Data Transfer Object for creating a new superhero
 * Includes validation rules for required fields
 */
export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Superhero's name, must not be empty

  @IsString()
  @IsNotEmpty()
  superpower: string; // Superhero's special ability

  @IsNumber()
  @Min(1) // Minimum humility score
  @Max(10) // Maximum humility score
  humility: number; // Humility rating on a scale of 1-10
}
