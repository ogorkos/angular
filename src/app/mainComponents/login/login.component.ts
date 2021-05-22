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
  

  // No usage
  async loginFunc(email:string, password:string){
    await this.loginServ.loginWithEmailPassword(email, password).catch((err)=>{
      if (email==="" || password===""){
        // console.log(true);        
      // console.log("email = ", email)
      // console.log("password = ", password)
    }
      else{console.log("have email and password");
      }      
      this.errorMessage=err
    })
  }

  async onSubmit(form){
    // console.warn(this.userForm);
    await this.loginServ.loginWithEmailPassword(this.userForm.value.email, this.userForm.value.password).catch((err)=>{
      console.log(err);      
      this.errorMessage=err
    })
  }

  closeAlert(){
    this.errorMessage = "";
  }

  async loginGoogle(){
    console.log("loginGoogle");
    await this.loginServ.loginWithGoogle();    
  }

  async loginFacebook(){
    console.log("loginFacebook");
    await this.loginServ.doFacebookLogin();    
  }
  async loginTwitter(){
    console.log("loginTwitter");
    await this.loginServ.doTwitterLogin();  
    //no usage userImage, userId, userPhoto  
  }


  goto(){
    if (this.loginServ.user) {     
      this.loginServ.goto()
    }
  }

}
