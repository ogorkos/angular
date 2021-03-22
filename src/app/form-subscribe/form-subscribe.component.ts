import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Subscribe} from '../classes/subscribe'

@Component({
  selector: 'app-form-subscribe',
  templateUrl: './form-subscribe.component.html',
  styleUrls: ['./form-subscribe.component.css']
})
export class FormSubscribeComponent implements OnInit,AfterViewInit {

  ngAfterViewInit():void{}

  result:any

  form={
    firstName:'',
    email:'',
    lastName:'',
    address:''
  }

  // @Input() test='';

  user:Subscribe

  constructor() { }
  
  // @ViewChild('email') emailField:ElementRef

  ngOnInit(): void {
    
    // this.email.nativeElement.value='test'
  }
 


  onSave(email:string,firstName:string,lastName:string,address:string){
      this.user=new Subscribe(email,firstName,lastName,address);
      console.log(this.user)
      this.result=Object.keys(this.user)
      .map((key) => [key.slice(1) + ' : ' + this.user[key]])
      console.log(this.result);      
  }

}
