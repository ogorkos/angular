import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myForm : FormGroup = new FormGroup({
             
    "name": new FormControl(),
    "email": new FormControl(),
});

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log(form);

  }

   onSave(email:string,password:HTMLInputElement){
    console.log(email);
    console.log(password.value)
  }

}
