import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CarViewModel } from './interfaces/car.interface';
import { CreateServiceCarModel } from './dtos/createCar.dto';
import { UpdateCarViewModel } from './dtos/updateCar.dto';
import { Db } from 'mongodb';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class CarsService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async find(): Promise<CarViewModel[]> {
    return await this.db
      .collection('car')
      .find({}, { projection: { _id: 0 } })
      .toArray();
  }

  async findOne(id: string): Promise<CarViewModel> {
    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    const response: CarViewModel = await this.db
      .collection('car')
      .findOne<CarViewModel>(
        {
          carId: id,
        },
        { projection: { _id: 0 } },
      );

    if (!response) {
      throw new NotFoundException();
    }

    return response;
  }

  async create(body: CreateServiceCarModel): Promise<void> {
    body.carId = uuidv4();
    await this.db.collection('car').insert(body);
  }

  async update(id: string, body: UpdateCarViewModel): Promise<void> {
    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    const response: CarViewModel = await this.db
      .collection('car')
      .findOne<CarViewModel>(
        {
          carId: id,
        },
        { projection: { _id: 0 } },
      );

    if (!response) {
      throw new NotFoundException();
    }

    await this.db.collection('car').updateOne(
      {
        carId: id,
      },
      {
        $set: {
          ...body,
        },
      },
    );
  }

  async delete(id: string): Promise<void> {
    if (!uuidValidate(id)) {
      throw new BadRequestException();
    }

    const response = await this.db.collection('car').deleteOne({
      carId: id,
    });

    if (response.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
