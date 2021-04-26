import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SpinnerService {
  
  showSpinner = new BehaviorSubject<boolean>(false);   //false значение по умолчанию
  // showSpinner = new BehaviorSubject<boolean>(true);   //false значение по умолчанию

  constructor() { }

  showSpinnerFunc(status:boolean){
    this.showSpinner.next(status)   //передаем новое значение для переменной showSpinner
  }

}
