import { UpdateHotelDto } from './../domain/dto/update-hotel.dto';
import { Inject, Injectable } from '@nestjs/common';
import type { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class UpdateHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  async execute(id: number, updateHotelDto: UpdateHotelDto) {
    return await this.hotelRepositories.updateHotel(id, updateHotelDto);
  }
}
