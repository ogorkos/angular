import { LoginService } from './../../services/login.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShowNavBarService } from '../../services/show-nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})


export class NavBarComponent implements OnInit {

  @Output() selectedItem=new EventEmitter<any>();

  navBarStatus:boolean=true
  
  constructor(
    private navServ:ShowNavBarService,
    private ls:LoginService) { }

  ngOnInit(): void {
    this.navServ.data.subscribe((data)=>{
      console.log('navBar =', data);
      this.navBarStatus=data
    })
  }

  selected(item:number){
    this.selectedItem.emit(item)
  }

  logOut(){
    this.ls.logOut();
    console.log("Sing Out");
    
  }
}
