import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  color:string='black'

  getColor(){
    return this.color
  }

  setColor(color:string){
    this.color=color
  }
}
