import { Inject, Injectable } from '@nestjs/common';
import type { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const data = await this.hotelRepositories.findHotels(offset, limit);

    const total = await this.hotelRepositories.countHotels();

    return {
      total,
      page,
      per_page: limit,
      data,
    };
  }
}
