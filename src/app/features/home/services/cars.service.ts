import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../../shared/models/car.dto';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private readonly API_URL = 'https://localhost:44329/api/cars';

  constructor(private http: HttpClient) { }

  getAvailableCars(startDate: string | Date, endDate: string | Date, filter: string): Observable<CarDto[]> {
    const formatDate = (date: string | Date): string => {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    };

    const params = new HttpParams()
      .set('startDate', formatDate(startDate))
      .set('endDate', formatDate(endDate))
      .set('filter', filter);

    return this.http.get<CarDto[]>(`${this.API_URL}/available`, { params });
  }

  getMostRentedCarType(): Observable<{ type: string; count: number }> {
    return this.http.get<{ type: string; count: number }>(`${this.API_URL}/most-rented-type`);
  }
}
