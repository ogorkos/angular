import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project01032021';

  menu:number=1;

  selectedMenu(item){
    this.menu=item;
  }


}
