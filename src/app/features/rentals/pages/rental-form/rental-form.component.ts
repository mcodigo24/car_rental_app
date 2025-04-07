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
  editMode = false;
  rentalId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private rentalService: RentalService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    this.selectedCar = nav?.extras?.state?.['selectedCar'];
    const startDate = nav?.extras?.state?.['startDate'];
    const endDate = nav?.extras?.state?.['endDate'];

    this.editMode = !!state?.['editMode'];
    this.rentalId = state?.['rentalId'];

    this.rentalForm = this.fb.group({
      personID: [state?.['personID'] || '', [Validators.required, Validators.minLength(7)]],
      fullName: [state?.['fullName'] || '', Validators.required],
      address: [state?.['address'] || '', Validators.required],
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

    const observable = this.editMode
      ? this.rentalService.updateRental(this.rentalId!, customer, rental)
      : this.rentalService.registerRentalWithCustomer(customer, rental);

    observable.subscribe({
      next: () => {
        this.snackBar.open(
          this.editMode ? 'Reservation updated' : 'Reservation successfully confirmed',
          'Close',
          { duration: 2000 }
        );
        this.rentalForm.reset();
        this.step = 1;
        this.router.navigate(['/rentals']);
        this.isSubmitting = false;
      },
      error: () => {
        this.snackBar.open('Error while saving reservation', 'Close', {
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