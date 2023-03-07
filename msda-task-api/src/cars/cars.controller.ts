import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CarViewModel } from './interfaces/car.interface';
import { CarsService } from './cars.service';
import { CreateCarViewModel, CreateServiceCarModel } from './dtos/createCar.dto';
import { UpdateCarViewModel } from './dtos/updateCar.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  async find(): Promise<CarViewModel[]> {
    return await this.carsService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CarViewModel> {
    return await this.carsService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateCarViewModel): Promise<void> {
    await this.carsService.create(body as CreateServiceCarModel);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCarViewModel,
  ): Promise<void> {
    await this.carsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.carsService.delete(id);
  }
}
