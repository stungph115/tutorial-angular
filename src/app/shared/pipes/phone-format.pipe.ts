import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  
  transform(tel) {
    tel = tel.charAt(0) != 0 ? "0" + tel : "" + tel;
  
    let newStr = "";
    let i = 0;
  
    for (; i < Math.floor(tel.length / 2) - 1; i++) {
      newStr = newStr + tel.substr(i * 2, 2) + "-";
    }
  
    return newStr + tel.substr(i * 2);
  }

}
