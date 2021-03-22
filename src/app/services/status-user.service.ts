import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusUserService {

  constructor() { }

  status:boolean=null;

  isUserLogin(){
    return new Promise( (resolve) => {
      if (this.status===null){
        setTimeout(() => {
          resolve(this.status)
        },1000); 
      } else { resolve(this.status)}      
    })
  }

  
}
