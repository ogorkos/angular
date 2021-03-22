import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})


export class NavBarComponent implements OnInit {

  @Output() selectedItem=new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selected(item:number){
    this.selectedItem.emit(item)
  }
}
