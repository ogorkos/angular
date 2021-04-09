import { Component, OnInit } from '@angular/core';
import { ShowNavBarService } from 'src/app/services/show-nav-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor(private navServ:ShowNavBarService) { }

  ngOnInit(): void {
    // this.navServ.hideNavBar()    // чтобы отключить навигацию
  }

  // ngOnDestroy(): void {
  //   this.navServ.showNavBar()    // чтобы включить навигацию
  // }

}
