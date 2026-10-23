import { Module } from '@nestjs/common';
import { CreateReservationsService } from './services/createReservations.service';
import { ReservationsController } from './infra/reservations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { HotelsModule } from '../hotels/hotels.module';
import { ReservationRepository } from './infra/reservations.repository';
import { REPOSITORY_TOKEN_RESERVATION } from './utils/repositoriesTokens';
import { HotelsRepositories } from '../hotels/infra/hotels.repository';
import { REPOSITORY_TOKEN_HOTEL } from 'src/modules/hotels/utils/repositoriesTokens';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, HotelsModule],
  controllers: [ReservationsController],
  providers: [
    CreateReservationsService,
    {
      provide: REPOSITORY_TOKEN_RESERVATION,
      useClass: ReservationRepository,
    },
    {
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: HotelsRepositories,
    },
  ],
})
export class ReservationsModule {}
