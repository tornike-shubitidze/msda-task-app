import { IsNotEmpty } from 'class-validator';

export class CreateCarViewModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  year: string;

  description: string;
}

export class CreateServiceCarModel extends CreateCarViewModel {
  carId: string;
}
