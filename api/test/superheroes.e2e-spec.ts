import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { SuperheroesController } from 'src/superheroes/superheroes.controller';
import { SuperheroesService } from 'src/superheroes/superheroes.service';
import { CreateSuperheroDto } from 'src/superheroes/dto/create-superhero.dto';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  describe('POST /superheroes', () => {
    it('should successfully create a superhero with valid data', async () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Spider-Man',
        superpower: 'Web-slinging',
        humility: 8,
      };

      const expectedResult = {
        id: 1,
        ...createSuperheroDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createSuperheroDto);

      expect(service.create).toHaveBeenCalledWith(createSuperheroDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw validation error when humility is out of range', async () => {
      const invalidDto = {
        name: 'Iron Man',
        superpower: 'Genius, Billionaire, Playboy, Philanthropist',
        humility: 11,
      };

      const validationPipe = new ValidationPipe();

      await expect(
        validationPipe.transform(invalidDto, {
          type: 'body',
          metatype: CreateSuperheroDto,
        }),
      ).rejects.toThrow();
    });

    it('should throw validation error when required fields are missing', async () => {
      const invalidDto = {
        name: 'Batman',
        humility: 5,
      };

      const validationPipe = new ValidationPipe();

      await expect(
        validationPipe.transform(invalidDto, {
          type: 'body',
          metatype: CreateSuperheroDto,
        }),
      ).rejects.toThrow();
    });
  });
});
