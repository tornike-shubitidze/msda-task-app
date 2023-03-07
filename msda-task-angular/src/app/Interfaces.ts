export interface Car {
  carId: string;
  name: string;
  model: string;
  year: string;
  description?: string;
}

export interface PropsData {
  btnText: string;
  car: Car;
}

export interface ErrorMessage {
  title: string;
  text: string;
}
