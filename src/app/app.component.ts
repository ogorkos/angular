import { SpinnerService } from './services/spinner.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';
import { Router, NavigationEnd  } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  disableContainer:boolean = true;
  showSpinner:boolean = false;

  constructor(private ls:LoginService,
    private _Activatedroute:ActivatedRoute, //считывает параметры из ссылки
    private router: Router,
    private firestore: AngularFirestore,
    private spinner:SpinnerService
    ) { }

  ngAfterViewInit(): void {
    //подписываемся на переменную showSpinner в сервисе и при ее изменении мгновенно получаем ее новое значение
    this.spinner.showSpinner.subscribe((value) => {   
      setTimeout(() => {
        this.showSpinner = value
      }, 1); 
      // задержка нужна чтобы было время на обновление данных
    }
    )
  }

  ngOnInit(): void {
    this.ls.checkIfUserLogin();
    
      // console.log(window.location.pathname);
      // if (window.location.pathname === '/login') {
    
      //   this.disableContainer = false
      // } else this.disableContainer = true
    
  }


}
