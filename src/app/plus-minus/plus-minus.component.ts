import { PlusMinusService } from './../services/plus-minus.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.css']
})
export class PlusMinusComponent implements OnInit {
  number:number;
  titleMinus:string='-'
  titlePlus:string='+'


  constructor(private pm:PlusMinusService) { }

  Plus:boolean

  ngOnInit(): void {
    this.number=this.pm.getPM()
  }
  
  printNumber(number:number){
    this.number=number;
    this.pm.setNum(number)
  }

  // plus(number:number){
  //   this.number=this.pm.plus(number)
  // }

  // minus(number:number){
  //   this.number=this.pm.minus(number)
  // }

}