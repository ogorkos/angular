import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';
import { Router, NavigationEnd  } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title = 'companyCrm';
  disableContainer:boolean = true;

  constructor(private ls:LoginService,
    private _Activatedroute:ActivatedRoute, //считывает параметры из ссылки
    private router: Router
    ) { }

  ngOnInit(): void {
    this.ls.checkIfUserLogin();
    // if (this.router.url === '/dashboard') {
      // console.log(this.router);
      // this.router.events.filter((event: any) => event instanceof NavigationEnd).subscribe(event => {             console.log('this is what your looking for ', event.url);         })
      console.log(window.location.pathname);
      if (window.location.pathname === '/dashboard') {
        console.log('Enable');
        this.disableContainer = false
      } else this.disableContainer = true
    // }

  }


}
