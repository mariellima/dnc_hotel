import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens';
import type { IReservationRepository } from '../domain/repositories/Ireservations.repository';
import { ReservationStatus } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/modules/users/user.services';

@Injectable()
export class UpdateStatusReservationsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationsRepository: IReservationRepository,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async execute(id: number, status: ReservationStatus) {
    const reservation = await this.reservationsRepository.updateStatus(
      id,
      status,
    );

    const user = await this.userService.show(reservation.userId);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reservation Status Updated',
      html: '<p>Sua reserva foi atualizada.</p>',
    });
    return reservation;
  }
}
