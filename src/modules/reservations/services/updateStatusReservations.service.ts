import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens';
import type { IReservationRepository } from '../domain/repositories/Ireservations.repository';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class UpdateStatusReservationsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationsRepository: IReservationRepository,
  ) {}

  async execute(id: number, status: ReservationStatus) {
    return await this.reservationsRepository.updateStatus(id, status);
  }
}
