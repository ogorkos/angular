import { Pipe, PipeTransform } from '@angular/core';
import {Worker} from '../models/worker'

@Pipe({
  name: 'searchWorkers'
})
export class SearchWorkersPipe implements PipeTransform {

  transform(workers: Worker[], searchValue: string): Worker[] {
    
    if (!searchValue) return workers;
    
    return  workers.filter((worker) => 
       worker.firstName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 
    || worker.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    || worker.birthday.indexOf(searchValue) !== -1
    || worker.email.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    || worker.phones.filter(item => item.name.indexOf(searchValue) !== -1).length>0
     )
  }

  serchPhones(worker: Worker, searchValue: string){
    return worker.phones.filter((phone) => phone.name === searchValue)}
}