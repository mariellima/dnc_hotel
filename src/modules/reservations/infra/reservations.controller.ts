import { Controller, Get, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';

import { CreateReservationsService } from '../services/createReservations.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/decorators/user.decorator';
import { ParamId } from 'src/shared/decorators/paramid.decorator';
import { FindAllReservationsService } from '../services/findAllReservations.service';
import { FindByIdReservationsService } from '../services/findByIdReservations.service';
import { FindByUserReservationsService } from '../services/findByUserReservation.service';
import { UpdateStatusReservationsService } from '../services/updateStatusReservations.service';
import { ReservationStatus, Role } from '@prisma/client';
import { Roles } from 'src/shared/decorators/roles.decorators';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
    private readonly findAllReservationsService: FindAllReservationsService,
    private readonly findByIdReservationsService: FindByIdReservationsService,
    private readonly findByUserReservationsService: FindByUserReservationsService,
    private readonly UpdateStatusReservationsService: UpdateStatusReservationsService,
  ) {}

  @Roles(Role.USER)
  @Post()
  create(@User('id') id: number, @Body() body: CreateReservationDto) {
    return this.createReservationsService.create(id, body);
  }

  @Get()
  findAll() {
    return this.findAllReservationsService.execute();
  }

  @Get('user')
  findByUser(@User('id') id: number) {
    return this.findByUserReservationsService.execute(id);
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findByIdReservationsService.execute(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updateStatus(
    @ParamId() id: number,
    @Body('status') status: ReservationStatus,
  ) {
    return this.UpdateStatusReservationsService.execute(id, status);
  }
}
