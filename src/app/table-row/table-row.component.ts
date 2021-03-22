import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  constructor() { }

 @Input() index: number
 @Input() name: string='test'
 @Input() lastName: string='test'

 @Output() onNewDelItem=new EventEmitter<any>();

  ngOnInit(): void {
    console.log(this.name)
  }

  delete(index:number):void{
   
    this.onNewDelItem.emit(index)
  }

}
