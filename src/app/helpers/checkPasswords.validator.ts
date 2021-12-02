import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

const checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
  let pass = group.get('password')?.value;
  let confirmPass = group.get('confirmPassword')?.value
  return pass === confirmPass ? null : { notSame: true }
}

export { checkPasswords }
