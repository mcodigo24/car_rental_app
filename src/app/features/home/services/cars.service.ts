import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { CarDto } from '../models/car.dto';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor() { }

  getAvailableCars(startDate: string, endDate: string, filter: string): Observable<CarDto[]> {
    const allCars: CarDto[] = [
      { id: 1, type: 'SUV', model: 'Toyota RAV4' },
      { id: 2, type: 'Sedan', model: 'Honda Civic' },
      { id: 3, type: 'Truck', model: 'Ford F-150' },
      { id: 4, type: 'Compact', model: 'Chevrolet Spark' },
    ];

    // Simulamos el filtrado por tipo o modelo
    const filtered = allCars.filter(car =>
      car.type.toLowerCase().includes(filter.toLowerCase()) ||
      car.model.toLowerCase().includes(filter.toLowerCase())
    );

    return of(filtered).pipe(delay(500));
  }
}
