import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<string>, args: any[]): any {

    const sortField = args[0];
    const sortDirection = args[1];

    let multiplier = 1

    if (sortDirection === 'desc') {
      multiplier = -1
    }
    value.sort((a: any, b: any) => {
      return a[sortField] > b[sortField]? 1 * multiplier : -1 * multiplier
    })
    // value.sort((a: any, b: any) => {
    //   if (a[sortField] < b[sortField]) {
    //     return -1;
    //   } else if (a[sortField] > b[sortField]) {
    //     return 1;
    //   } else {
    //     return 0;
  
    //   }
    // })

    return value;
  }

}
