import { IsNotEmpty } from 'class-validator';

export class UpdateCarViewModel {
  @IsNotEmpty()
  carId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  year: string;
  
  description: string;
}
