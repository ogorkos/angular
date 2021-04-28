import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStampToDate'
})
export class TimeStampToDatePipe implements PipeTransform {

  transform(timestamp: number): string {
    const date = new Date(timestamp)
    const day = date.getDate()
    const mm = date.getMonth()+1
    const yy = date.getFullYear()

    return day+"/"+mm+"/"+yy
  }

}
