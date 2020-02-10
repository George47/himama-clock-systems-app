import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    
    const minutes: number = Math.floor(value / 60);

    return ((minutes < 10) ? ('0' + minutes) : minutes ) + ':' + (((value - minutes * 60) < 10) ? ('0' + (value - minutes * 60)) : (value - minutes * 60));
  }
}
