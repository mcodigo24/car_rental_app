import { Injectable } from '@angular/core';
import { CustomerDto } from '../../shared/models/customer.dto';
import { delay, of, switchMap } from 'rxjs';
import { RentalDto } from '../../shared/models/rental.dto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

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
}