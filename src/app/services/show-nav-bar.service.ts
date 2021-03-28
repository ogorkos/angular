import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowNavBarService {

  private showNavbar = new BehaviorSubject<boolean>(true);
  data = this.showNavbar.asObservable();

  constructor() { }

  hideNavBar(){
    this.showNavbar.next(false)
  }

  showNavBar(){
    this.showNavbar.next(true)
  }
}
