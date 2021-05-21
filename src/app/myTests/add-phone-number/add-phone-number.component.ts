import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.css']
})
export class AddPhoneNumberComponent implements OnInit {

  fg: FormGroup; //myForm
  constructor(private fb: FormBuilder){}
  ngOnInit() {
  this.fg = this.fb.group({
    address: this.fb.group({
      street: ['', Validators.required],
    }),
    aliases: this.fb.array([])
  });
  const fa = (this.fg.get('aliases')as FormArray);
  this.addNewAlias();
  }
  addNewAlias(){
    const fa = (this.fg.get('aliases')as FormArray);
    fa.push(this.fb.group({
      name: ['', Validators.required]
    }));
    console.log(this.fg);
    
  }
  deleteAlias(i:number){
    const fa = (this.fg.get('aliases')as FormArray);
    fa.removeAt(i);
    if(fa.length===0) this.addNewAlias();
    console.log(this.fg);
  }
}
