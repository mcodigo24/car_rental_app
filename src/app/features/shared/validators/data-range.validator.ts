import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const dateRangeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;

  if (start && end && new Date(end) < new Date(start)) {
    return { dateRangeInvalid: true };
  }

  return null;
};