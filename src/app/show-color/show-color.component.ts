import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-color',
  templateUrl: './show-color.component.html',
  styleUrls: ['./show-color.component.css']
})
export class ShowColorComponent implements OnInit {

  color:string='red'

  constructor() { }

  ngOnInit(): void {
  }

}
