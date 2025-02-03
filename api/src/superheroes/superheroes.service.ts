import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { Superhero } from 'src/interfaces/superhero.interface';
/**
 * Service handling superhero business logic and data storage
 */
@Injectable()
export class SuperheroesService {
  //  In-memory storage for superheroes
  private superheroes: Superhero[] = [
    { name: 'Batman', superpower: 'Rich', humility: 1 },
    { name: 'Superman', superpower: 'Flying', humility: 10 },
  ];

  /**
   * Creates a new superhero
   * @param data Validated superhero data
   * @returns Created superhero
   */
  async create(data: CreateSuperheroDto) {
    this.superheroes.push(data);
    return data;
  }

  /**
   * Retrieves all superheroes sorted by humility in descending order
   * @returns Sorted array of superheroes
   */
  async findAll() {
    return this.superheroes.sort((a, b) => b.humility - a.humility);
  }
}
