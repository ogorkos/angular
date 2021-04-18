import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
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
  disableContainer:boolean = true;

  constructor(private ls:LoginService,
    private _Activatedroute:ActivatedRoute, //считывает параметры из ссылки
    private router: Router,
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.ls.checkIfUserLogin();
    
      // console.log(window.location.pathname);
      if (window.location.pathname === '/login') {
    
        this.disableContainer = false
      } else this.disableContainer = true
    
//Firestore:
    //   this.firestore.collection("users").add({
    //     first: "Kostya",
    //     last: "O",
    //     born: 1983
    // })
    // .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });





  }


}
