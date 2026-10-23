import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { stat, unlink } from 'fs/promises';
import { join, resolve } from 'path';

@Injectable()
export class UploadImageHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  async execute(id: string, imageFileName: string) {
    const hotel = await this.hotelRepositories.findHotelById(Number(id));
    const directory = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'uploads-hotel',
    );

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    if (hotel.image) {
      const imageHotelFilePath = join(directory, hotel.image);
      try {
        await stat(imageHotelFilePath);
        await unlink(imageHotelFilePath);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
          throw error;
        }
      }
    }

    return await this.hotelRepositories.updateHotel(Number(id), {
      image: imageFileName,
    });
  }
}
