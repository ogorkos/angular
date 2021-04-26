import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlusMinusService } from 'src/app/services/plus-minus.service';

@Component({
  selector: 'app-btn-plus-min',
  templateUrl: './btn-plus-min.component.html',
  styleUrls: ['./btn-plus-min.component.css']
})
export class BtnPlusMinComponent implements OnInit {

  constructor(private pm:PlusMinusService) { }

  @Input() Plus: boolean;
  @Input() number: number;
  @Input() simvol: string;
  @Output() newnumber=new EventEmitter<number>();


  ngOnInit(): void {
    
  }

  newNumber(){
    if (this.Plus) {this.number = this.pm.plus(this.number)}
    else {this.number = this.pm.minus(this.number)}
    this.newnumber.emit(this.number)
  }

  // newNumber(){
  //   if (this.Plus) {this.number = this.pm.setNewValue(this.number+1)}
  //   else {this.pm.setNewValue(this.number-1)}
  //   // this.newnumber.emit(this.number)
  // }

}
