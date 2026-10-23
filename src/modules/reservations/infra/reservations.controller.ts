import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';
import { CreateReservationsService } from '../services/createReservations.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: CreateReservationsService,
  ) {}

  @Post()
  create(@User('id') id: number, @Body() body: CreateReservationDto) {
    return this.reservationsService.create(id, body);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
