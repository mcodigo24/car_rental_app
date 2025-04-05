import { Component } from '@angular/core';
import { CarDto } from '../../models/car.dto';
import { CarsService } from '../../services/cars.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})

export class HomeComponent {
  availableCars: CarDto[] = [];
  loading = false;

  constructor(private carsService: CarsService) { }

  onFormSubmitted(filters: { startDate: string; endDate: string; filter: string }) {
    this.loading = true;

    this.carsService
      .getAvailableCars(filters.startDate, filters.endDate, filters.filter ?? '')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (cars) => (this.availableCars = cars),
        error: (err) => console.error('Error fetching cars:', err),
      });
  }
}
