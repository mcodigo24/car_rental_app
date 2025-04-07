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
    'id', 'customerId', 'personId', 'fullName', 'address', 'carId', 'carType', 'carModel', 'startDate', 'endDate', 'actions'
  ];

  constructor(private rentalService: RentalService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchRentals();
  }

  fetchRentals() {
    this.isLoading = true;
    this.rentalService.getRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching rentals:', err);
        this.rentals = [];
        this.isLoading = false;
      }
    });
  }

  cancelRental(id: number) {
    const confirmed = window.confirm('Are you sure you want to cancel this reservation?');
    if (confirmed) {
      this.rentalService.cancelRental(id).subscribe({
        next: () => {
          this.snackBar.open('Rental cancelled successfully', 'Close', { duration: 2000 });
          this.fetchRentals();
        },
        error: (err) => {
          console.error('Error cancelling rental:', err);
          this.snackBar.open('Error cancelling rental. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  editRental(rental: RentalDto) {
    this.router.navigate(['/rentals/register'], {
      state: {
        editMode: true,
        rentalId: rental.id,
        personId: rental.customer?.personId,
        fullName: rental.customer?.fullName,
        address: rental.customer?.address,
        startDate: rental.startDate,
        endDate: rental.endDate,
        customerId: rental.customer?.id,
        selectedCar: {
          id: rental.car?.id,
          model: rental.car?.model,
          type: rental.car?.type
        }
      }
    });
  }
}
