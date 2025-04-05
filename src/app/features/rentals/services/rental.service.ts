import { Injectable } from '@angular/core';
import { CustomerDto } from '../../shared/models/customer.dto';
import { delay, Observable, of, switchMap } from 'rxjs';
import { RentalDto } from '../../shared/models/rental.dto';

export interface Rental {
  id: number;
  customer: {
    personID: string;
    fullName: string;
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
      customer: { personID: '12345678', fullName: 'Juan Pérez' },
      car: { id: 10, type: 'SUV', model: 'Toyota RAV4' },
      startDate: '2024-05-01',
      endDate: '2024-05-07',
    },
    {
      id: 2,
      customer: { personID: '87654321', fullName: 'Ana Gómez' },
      car: { id: 12, type: 'Sedan', model: 'Honda Civic' },
      startDate: '2024-05-10',
      endDate: '2024-05-15',
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
}