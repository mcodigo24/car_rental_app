import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarDto } from '../../../shared/models/car.dto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { RentalService } from '../../services/rental.service';
import { CustomerDto } from '../../../shared/models/customer.dto';
import { dateRangeValidator } from '../../../shared/validators/data-range.validator';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss'],
  standalone: false,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class RentalFormComponent {
  rentalForm: FormGroup;
  selectedCar!: CarDto;
  step = 1;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private rentalService: RentalService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.selectedCar = nav?.extras?.state?.['selectedCar'];
    const startDate = nav?.extras?.state?.['startDate'];
    const endDate = nav?.extras?.state?.['endDate'];

    this.rentalForm = this.fb.group({
      personID: ['', [Validators.required, Validators.minLength(7)]],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      startDate: [startDate ? new Date(startDate) : '', Validators.required],
      endDate: [endDate ? new Date(endDate) : '', Validators.required],
    },
      {
        validators: dateRangeValidator
      });
  }

  nextStep() {
    if (this.rentalForm.valid) {
      this.step = 2;
    }
  }

  confirmReservation() {
    this.isSubmitting = true;
    const { personID, fullName, address, startDate, endDate } = this.rentalForm.value;

    const customer: CustomerDto = {
      personID: personID,
      fullName,
      address
    };

    const rental = {
      carId: this.selectedCar.id,
      startDate,
      endDate,
    };

    this.rentalService.registerRentalWithCustomer(customer, rental).subscribe({
      next: () => {
        this.snackBar.open('Reservation successfully confirmed', 'Close', {
          duration: 2000,
        });
        this.rentalForm.reset();
        this.step = 1;
        this.router.navigate(['/']);
        this.isSubmitting = false;
      },
      error: () => {
        this.snackBar.open('Error while confirming reservation', 'Close', {
          duration: 2000,
        });
        this.isSubmitting = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}