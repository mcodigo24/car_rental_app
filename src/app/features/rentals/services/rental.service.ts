import { Injectable } from '@angular/core';
import { CustomerDto } from '../../shared/models/customer.dto';
import { delay, Observable, of, switchMap } from 'rxjs';
import { RentalDto } from '../../shared/models/rental.dto';
import { HttpClient } from '@angular/common/http';

export interface Rental {
  id: number;
  customer: {
    personId: string;
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
  private readonly API_URL = 'https://localhost:44329/api/rentals';
  private rentals: Rental[] = [];

  constructor(private http: HttpClient) { }

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
    return this.http.get<Rental[]>(`${this.API_URL}`);
  }

  cancelRental(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/cancel`, {});
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