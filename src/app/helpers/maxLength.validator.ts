import {FormControl} from "@angular/forms";

export class MaxLengthValidator {
  static checkLength(control: FormControl): {[key: string]: boolean} {
    if (control.value.length > 20) {
      return { 'tooLongLength': true }
    } else if(control.value.length < 3) {
      return { 'tooShortLength': true }
    }

    return {}
  }
}
