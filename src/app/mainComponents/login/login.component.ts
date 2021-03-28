import { LoginService } from './../../services/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowNavBarService } from 'src/app/services/show-nav-bar.service';
import { IfUserLogin } from '../../guards/ifUserLogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  login:boolean=true;
  errorMessage:string="";
  disabled:boolean=false;
  input={emailVal:"", passwordVal:""};

  constructor(
    private router:Router,                  //нужно для ссылок на другие URL
    private route: ActivatedRoute,           //нужно для ссылок на другие URL
    private navServ:ShowNavBarService,
    private loginServ:LoginService
  ) { }
  ngOnDestroy(): void {
    this.navServ.showNavBar()
  }

  ngOnInit(): void {
    this.navServ.hideNavBar();
    
  }

  // onSave(email:string,password:string){
  //   // console.log(email);
  //   // console.log(password)
  //   if (email && password) {
  //   this.login=true;
    
  //   setTimeout(() => {
  //     this.router.navigate(['/plusminus'],{relativeTo: this.route })   
  //   }, 2000);
  //   }
  // }
  
  loginFunc(email:string, password:string){
    this.loginServ.loginWithEmailPassword(email, password).catch((err)=>{
      if (email==="" || password===""){
        console.log(true);
        
      console.log("email = ", email)
      console.log("password = ", password)
    }
      else{console.log("have email and password");
      }
      
      this.errorMessage=err
    })
  }

  closeAlert(){
    this.errorMessage = "";
  }
}
