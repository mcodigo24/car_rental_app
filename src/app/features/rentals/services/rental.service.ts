import { Injectable } from '@angular/core';
import { CustomerDto } from '../../shared/models/customer.dto';
import { catchError, delay, Observable, of, switchMap, throwError } from 'rxjs';
import { RentalDto } from '../../shared/models/rental.dto';
import { HttpClient } from '@angular/common/http';
import { CustomersService } from './customers.service';

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

  constructor(private http: HttpClient, private customersService: CustomersService) { }

  createRental(rental: RentalDto) {
    return this.http.post(`${this.API_URL}`, rental);
  }

  registerRentalWithCustomer(customer: CustomerDto, rental: Omit<RentalDto, 'customerId'>) {
    return this.customersService.createOrGetCustomer(customer).pipe(
      switchMap((createdCustomer) => {
        if (!createdCustomer.id) {
          throw new Error('CustomerId is missing from the response');
        }

        const rentalWithCustomerId: RentalDto = {
          ...rental,
          customerId: createdCustomer.id
        };

        return this.createRental(rentalWithCustomerId);
      }),
      catchError((error) => {
        console.error('Error registering rental with customer:', error);
        return throwError(() => error);
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