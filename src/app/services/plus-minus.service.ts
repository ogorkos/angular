import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlusMinusService {

  number:number=0;
  status:boolean=false
  pmStatus = new BehaviorSubject<number>(this.number)

  constructor() { }

  getPM(){
    return this.number;
  }

  plus(num:number){
    return num+1;
  }

  minus(num:number){
    return num-1;
  }

  setNum(val){
    this.number = val;
  }
}
