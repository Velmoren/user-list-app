import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameTransform'
})
export class NameTransformPipe implements PipeTransform {

  transform(str: string): string {
    const strArray = str.split(" ")

    if (strArray.length > 1) {
      return strArray.map((word: string, idx: number) => {
        if (idx === 0) {
          word = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        }  else {
          word = word.charAt(0).toUpperCase() + '.'
        }

        return word
      }).join(' ')
    } else {
     return strArray.toString()
    }
  }

}
