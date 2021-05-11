import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setcolor',
  templateUrl: './setcolor.component.html',
  styleUrls: ['./setcolor.component.css']
})
export class SetcolorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  save(color:string){
    console.log(color);
    
  }
}
