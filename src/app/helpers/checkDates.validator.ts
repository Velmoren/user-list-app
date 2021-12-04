import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

const checkDates: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
  let startAt = group.get('startAt')?.value;
  let endAt = group.get('endAt')?.value

  console.log(startAt)
  console.log(endAt)

  return startAt < endAt ? null : { notSameDate: true }
}

export { checkDates }
