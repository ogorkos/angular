import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public auth:AngularFireAuth,
    public router:Router,
    public route:ActivatedRoute
    ) { }

  user:any=null

  loginWithEmailPassword(email:string, password:string){
    console.log(email, password);
    return new Promise(async(resolve, reject) =>{
      this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // var user = userCredential.user;
        // this.user = userCredential.user;
        // console.log(user);
        this.router.navigate(['dashboard'],{relativeTo: this.route });        
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        reject(errorMessage)
      });
    })
}

checkIfUserLogin(){
  this.auth.onAuthStateChanged((user) =>{
    if (user) { 
      console.log(user);      
      this.user=user;
      // setTimeout(() => {
      //   this.router.navigate(['dashboard'],{relativeTo: this.route });  
      // }, 2000);
      return true      
    }
    else { 
      this.user=null 
      this.router.navigate(['login'],{relativeTo: this.route });       
      return false 
    }
  })
}

logOut(){
  this.auth.signOut()
}

}
