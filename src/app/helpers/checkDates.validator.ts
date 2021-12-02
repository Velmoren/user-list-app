import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

const checkDates: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
  let startAge = group.get('startAge')?.value;
  let endAge = group.get('endAge')?.value
  return startAge < endAge ? null : { notSameDate: true }
}

export { checkDates }
