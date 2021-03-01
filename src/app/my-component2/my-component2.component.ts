import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-component2',
  templateUrl: './my-component2.component.html',
  styleUrls: ['./my-component2.component.css']
})
export class MyComponent2 implements OnInit {

  constructor() { }
  name2: string="Gena"
  name: string="My String"
  names = ['Ari', 'Carlos', 'Felipe', 'Nate'];

  ngOnInit(): void {
  }

}
