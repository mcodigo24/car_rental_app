import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDto } from '../../shared/models/customer.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly API_URL = 'https://localhost:44329/api/customers';

  constructor(private http: HttpClient) { }

  createOrGetCustomer(customer: CustomerDto) {
    return this.http.post<CustomerDto>(`${this.API_URL}`, customer);
  }
}
