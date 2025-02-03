import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

/**
 * Controller handling superhero-related HTTP requests
 */

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  /**
   * Creates a new superhero
   * @param data Validated superhero data
   * @returns Newly created superhero
   */
  @Post('')
  async create(@Body() data: CreateSuperheroDto) {
    return this.superheroesService.create(data);
  }

  /**
   * Retrieves all superheroes sorted by humility
   * @returns Array of superheroes
   */
  @Get('')
  async findAll() {
    return this.superheroesService.findAll();
  }
}
