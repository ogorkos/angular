import { Component, OnInit } from '@angular/core';
import {Subscribe} from '../classes/subscribe'

@Component({
  selector: 'app-form-subscribe',
  templateUrl: './form-subscribe.component.html',
  styleUrls: ['./form-subscribe.component.css']
})
export class FormSubscribeComponent implements OnInit {

  constructor() { }
  user:Subscribe

  ngOnInit(): void {
    console.log(this.user)
  }
 

  onSave(email:string,firstName:string,lastName:string,address:string){
      console.log(new Subscribe(email,firstName,lastName,address))
      this.user=new Subscribe(email,firstName,lastName,address);
      console.log(this.user.firstName)
  }

}
