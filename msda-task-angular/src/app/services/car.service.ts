import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../Interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCar(car: Car): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/${car.carId}`);
  }

  addCar(car: Car): Observable<Car[]> {
    return this.http.post<Car[]>(this.apiUrl, car, httpOptions);
  }

  editCar(car: Car): Observable<Car[]> {
    return this.http.put<Car[]>(
      `${this.apiUrl}/${car.carId}`,
      car,
      httpOptions
    );
  }

  deleteCar(car: Car): Observable<Car[]> {
    return this.http.delete<Car[]>(`${this.apiUrl}/${car.carId}`, httpOptions);
  }
}
