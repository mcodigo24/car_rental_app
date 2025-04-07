import { Component } from '@angular/core';
import { Rental, RentalService } from '../../services/rental.service';
import { Router } from '@angular/router';
import { RentalDto } from '../../../shared/models/rental.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    'id', 'personID', 'fullName', 'address', 'carId', 'carType', 'carModel', 'startDate', 'endDate', 'actions'
  ];

  constructor(private rentalService: RentalService, private router: Router, private snackBar: MatSnackBar) { }

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
    const confirmed = window.confirm('Are you sure you want to cancel this reservation?');
    if (confirmed) {
      this.rentalService.cancelRental(id).subscribe(() => {
        this.fetchRentals();
        this.snackBar.open('Reservation cancelled successfully', 'Close', { duration: 2000 });
      });
    }
  }

  editRental(rental: RentalDto) {
    this.router.navigate(['/rentals/register'], {
      state: {
        editMode: true,
        rentalId: rental.id,
        personID: rental.customer?.personID,
        fullName: rental.customer?.fullName,
        address: rental.customer?.address,
        startDate: rental.startDate,
        endDate: rental.endDate,
        selectedCar: {
          id: rental.carId,
          model: rental.car?.model,
          type: rental.car?.type
        }
      }
    });
  }
}
