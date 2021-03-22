import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-component2',
  templateUrl: './my-component2.component.html',
  styleUrls: ['./my-component2.component.css']
})
export class MyComponent2 implements OnInit {

  url1="https://picsum.photos/300/200"
  url2="https://picsum.photos/300/300"

  constructor() { }
  names = ['Ari', 'Carlos', 'Felipe', 'Nate'];
  localLastName:string="My last name"

  // ngOnInit запускает функции
  ngOnInit(): void {
    this.showImg()
  }

  x:boolean=true;//flag

  showImg(){
    
    setInterval(() => {
      if (this.x){
        this.url1 = "https://picsum.photos/301/200";
        this.url2="https://picsum.photos/301/300";
        this.x=false
      } else {
        this.url1 = "https://picsum.photos/300/200";
        this.url2="https://picsum.photos/300/300";
        this.x=true
      }
      
    }, 3000);
  }

  deleteItem(index:number){
    console.log(index+"!")
    this.names.splice(index,1);
  }
}
