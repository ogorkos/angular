import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../models/client';


@Pipe({
  name: 'searchClientInArrPipe'
})
export class SearchInArrPipe implements PipeTransform {

  transform(clients: Client[], searchValue: string): Client[] {
    if (!searchValue) return clients;
    return  clients.filter((client) => 
       client.firstName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 
    || client.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    || client.email.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    || client.phone.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
  }


}
