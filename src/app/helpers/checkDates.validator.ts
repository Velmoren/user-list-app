import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

const checkDates: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
  let startAt = group.get('startAt')?.value;
  let endAt = group.get('endAt')?.value
  return startAt < endAt ? null : { notSameDate: true }
}

export { checkDates }
