import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'companyCrm';

  constructor(private ls:LoginService) { }

  ngOnInit(): void {
    this.ls.checkIfUserLogin()
  }


}
