import { LoginService } from './../../services/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowNavBarService } from 'src/app/services/show-nav-bar.service';
import { IfUserLogin } from '../../guards/ifUserLogin';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  login:boolean=true;
  errorMessage:string="";
  disabled:boolean=false;
  showBtnGotoDashboard:boolean = false;
  // input={emailVal:"", passwordVal:""};
  userForm: FormGroup;
  //   userForm = FormGroup({
    //     email : new FormControl('',[Validators.required, Validators.email]),
    //     password : new FormControl('',[Validators.required, Validators.minLength(6)])
    // });

  constructor(
    private router:Router,                  //нужно для ссылок на другие URL
    private route: ActivatedRoute,           //нужно для ссылок на другие URL
    private navServ:ShowNavBarService,
    private loginServ:LoginService,
    fb:FormBuilder
  ) { 
    this.userForm = fb.group({
      'email': ['',[Validators.required, Validators.email]],
      'password': ['',[Validators.required, Validators.minLength(6)]]
    })
  }
  ngOnDestroy(): void {
    this.navServ.showNavBar()
  }

  ngOnInit(): void {
    this.navServ.hideNavBar();
    if (this.loginServ.user){
      this.showBtnGotoDashboard = true
    }
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

  onSubmit(form){
    console.warn(this.userForm);
    this.loginServ.loginWithEmailPassword(this.userForm.value.email, this.userForm.value.password).catch((err)=>{
      console.log(err);      
      this.errorMessage=err
    })
  }

  closeAlert(){
    this.errorMessage = "";
  }

  loginGoogle(){
    console.log("loginGoogle");
    this.loginServ.loginWithGoogle();    
  }

  loginFacebook(){
    console.log("loginFacebook");
    this.loginServ.doFacebookLogin();    
  }
  loginTwitter(){
    console.log("loginTwitter");
    this.loginServ.doTwitterLogin();    
  }


  goto(){
    if (this.loginServ.user) {     
      this.loginServ.goto()
    }
  }

}
