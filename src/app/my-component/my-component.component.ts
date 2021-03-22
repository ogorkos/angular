import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  constructor(public http: HttpClient) { }
  
  ids:number[]=[]
  posts:any[]=[]

  ngOnInit(): void {
    this.ids=this.fillIdRundom(10);
    this.getData(this.ids)  
    // console.log(this.getData(this.ids)  );
    
    console.log(this.posts);    
  }
  
  fillIdRundom(num:number) {
    let min=1;
    let max=100;
    let array=[];
    for (let i = 0; i < num; i++) {
      array.push(Math.floor(Math.random() * (max - min) ) + min)}
    return array;
  }
  

  getData(ids:number[]){
        ids.forEach(id => {
          this.makeRequest(id);
        });
    }


  makeRequest(id): void {
      this.http
    .get('https://jsonplaceholder.typicode.com/posts/'+id)
    .subscribe(data => {
      this.posts.push(data)

      // console.log(data);
      // console.log(this.posts);
      
    });
    }





}
