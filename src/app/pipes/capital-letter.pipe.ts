import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalLetter'
})
export class CapitalLetterPipe implements PipeTransform {

  transform(value: string): string {
    let firstLetter = value.substr(0,1).toUpperCase();
    return firstLetter + value.substr(1);
  }

}
