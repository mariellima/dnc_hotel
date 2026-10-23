import { Inject, Injectable } from '@nestjs/common';
import type { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindByNameHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  async execute(name: string) {
    return await this.hotelRepositories.findHotelByName(name);
  }
}
