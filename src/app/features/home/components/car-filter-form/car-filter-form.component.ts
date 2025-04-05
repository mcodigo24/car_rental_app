import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-filter-form',
  standalone: false,
  templateUrl: './car-filter-form.component.html',
  styleUrl: './car-filter-form.component.scss'
})
export class CarFilterFormComponent implements OnInit {
  filterForm!: FormGroup;

  @Output() formSubmitted = new EventEmitter<{
    startDate: string;
    endDate: string;
    filter: string;
  }>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      filter: ['']
    });
  }

  onSubmit(): void {
    if (this.filterForm.valid) {
      this.formSubmitted.emit(this.filterForm.value);
    }
  }
}
