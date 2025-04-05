import { Component } from '@angular/core';
import { Rental, RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss'],
  standalone: false
})

export class RentalListComponent {
  rentals: Rental[] = [];
  isLoading = false;

  displayedColumns: string[] = [
    'id', 'personID', 'fullName', 'carId', 'carType', 'carModel', 'startDate', 'endDate', 'actions'
  ];

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.fetchRentals();
  }

  fetchRentals() {
    this.isLoading = true;
    this.rentalService.getRentals().subscribe((data) => {
      this.rentals = data;
      this.isLoading = false;
    });
  }

  cancelRental(id: number) {
    this.rentalService.cancelRental(id).subscribe(() => {
      this.fetchRentals();
    });
  }
}
