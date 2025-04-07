import { Component } from '@angular/core';
import { CarDto } from '../../../shared/models/car.dto';
import { CarsService } from '../../services/cars.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})

export class HomeComponent {
  availableCars: CarDto[] = [];
  loading = false;
  mostRentedCarInfo: { type: string, count: number } | null = null;

  constructor(private carsService: CarsService, private router: Router) { }

  filters!: { startDate: string; endDate: string; filter: string };

  ngOnInit() {
    this.carsService.getMostRentedCar().subscribe(info => {
      this.mostRentedCarInfo = info;
    });
  }

  onFormSubmitted(filters: { startDate: string; endDate: string; filter: string }) {
    this.loading = true;
    this.filters = filters;

    this.carsService
      .getAvailableCars(filters.startDate, filters.endDate, filters.filter ?? '')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (cars) => (this.availableCars = cars),
        error: (err) => console.error('Error fetching cars:', err),
      });
  }

  goToReservation(car: CarDto, startDate: string, endDate: string) {
    this.router.navigate(['/rentals/register'], {
      state: { selectedCar: car, startDate, endDate }
    });
  }
}
