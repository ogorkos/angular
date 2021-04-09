import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-react-form',
  templateUrl: './react-form.component.html',
  styleUrls: ['./react-form.component.css']
})
export class ReactFormComponent implements OnInit {

  myForm: FormGroup;

  constructor(fb: FormBuilder) { 
    this.myForm = fb.group({
      'email': ['',[
                      Validators.required, 
                      this.emailValidator
                    ]],
      'password': ['',[
                        Validators.required,
                        Validators.minLength(6),
                        // this.moreThen10
                      ]],
        'checkbox': [true]
      
      })
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {

    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!control.value.match(regularExpression)) {
    
    return {invalidEmail: true};
    
    }
  }


    // moreThen10(control: FormControl): { [s: string]: boolean } {

    //   if (control.value>10){
    //     return {moreThen10: true}
    //   }
  // }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log(this.myForm)
    console.log(form)
  }

}

