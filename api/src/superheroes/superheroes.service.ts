import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { Superhero } from 'src/interfaces/superhero.interface';

@Injectable()
export class SuperheroesService {
  private superheroes: Superhero[] = [
    { name: 'Batman', superpower: 'Rich', humility: 1 },
    { name: 'Superman', superpower: 'Flying', humility: 10 },
  ];

  async create(data: CreateSuperheroDto) {
    this.superheroes.push(data);
    return data;
  }

  async findAll() {
    return this.superheroes.sort((a, b) => b.humility - a.humility);
  }
}
