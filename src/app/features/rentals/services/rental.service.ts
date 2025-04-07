import { Injectable } from '@angular/core';
import { CustomerDto } from '../../shared/models/customer.dto';
import { delay, Observable, of, switchMap } from 'rxjs';
import { RentalDto } from '../../shared/models/rental.dto';

export interface Rental {
  id: number;
  customer: {
    personID: string;
    fullName: string;
    address: string;
  };
  car: {
    id: number;
    type: string;
    model: string;
  };
  startDate: string;
  endDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private rentals: Rental[] = [
    {
      id: 1,
      customer: { personID: '12345678', fullName: 'Juan Pérez', address: 'Av siempreviva 123' },
      car: { id: 10, type: 'Sedan', model: 'Toyota Corolla' },
      startDate: '2025-04-01',
      endDate: '2025-04-05',
    },
    {
      id: 2,
      customer: { personID: '87654321', fullName: 'Ana Gómez', address: 'Av siempreviva 123' },
      car: { id: 12, type: 'Sedan', model: 'Fiat Cronos' },
      startDate: '2025-05-10',
      endDate: '2025-05-15',
    },
    {
      id: 3,
      customer: { personID: '87654321', fullName: 'Maria Fernandez', address: 'Av siempreviva 123' },
      car: { id: 12, type: 'SUV', model: 'Chevrolet Tracker' },
      startDate: '2025-06-03',
      endDate: '2025-06-22',
    },
  ];

  constructor() { }

  createOrGetCustomer(customer: CustomerDto) {
    console.log('Simulating customer API call with:', customer);
    const generatedCustomerId = Math.floor(Math.random() * 10000);
    return of({ id: generatedCustomerId }).pipe(delay(1000));
  }

  createRental(rental: RentalDto) {
    console.log('Simulating rental API call with:', rental);
    return of({ success: true }).pipe(delay(1000));
  }

  registerRentalWithCustomer(customer: CustomerDto, rental: Omit<RentalDto, 'customerId'>) {
    return this.createOrGetCustomer(customer).pipe(
      switchMap((response) => {
        const rentalWithCustomerId: RentalDto = {
          ...rental,
          customerId: response.id
        };
        return this.createRental(rentalWithCustomerId);
      })
    );
  }

  getRentals(): Observable<Rental[]> {
    return of(this.rentals).pipe(delay(1000));
  }

  cancelRental(id: number): Observable<boolean> {
    this.rentals = this.rentals.filter((r) => r.id !== id);
    return of(true).pipe(delay(500));
  }

  updateRental(
    rentalId: number,
    customer: CustomerDto,
    rental: { carId: number; startDate: string; endDate: string }
  ) {
    console.log('Mock updating rental with ID:', rentalId);
    console.log('Updated customer:', customer);
    console.log('Updated rental info:', rental);

    return of({ success: true }).pipe(delay(1000));
  }
}