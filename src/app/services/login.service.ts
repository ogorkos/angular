import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';//for google auth
// import { Observable, of } from 'rxjs';
// import { User } from './user.model'
// import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // user$: Observable<any> // for User
  
  constructor(
    public auth:AngularFireAuth,
    public router:Router,
    public route:ActivatedRoute,
    // public afs:AngularFirestore
    ) { }

  user:any=null;
  userPhotoURL:any = null;
  userName:any = null;

  loginWithEmailPassword(email:string, password:string){
    // console.log(email, password);
    return new Promise(async(resolve, reject) =>{
      this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.router.navigate(['dashboard'], { relativeTo: this.route });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        reject(errorMessage)
      });
    })
}

checkIfUserLogin(){
  return new Promise(async (resolve, reject) => {
    if (this.user) {
      resolve(true)
      console.log(this.user);      
      return
    }  
    this.auth.onAuthStateChanged((user) =>{
      if (user) { 
        console.log(user);      
        this.user=user;
        resolve(true)   
      }
      else { 
        this.user=null 
        this.router.navigate(['login'],{relativeTo: this.route });       
        resolve(false) 
      }
    })
  }) 
}

logOut(){
  this.userPhotoURL = null;
  this.userName = null;
  this.auth.signOut();
}

loginWithGoogle() {
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.auth
    .signInWithPopup(provider)
    .then(res => {
      console.log(res);  
      this.user=res;
      this.userPhotoURL = this.user.user.photoURL;
      this.userName = this.user.user.displayName;
      resolve(res);
      this.router.navigate(['dashboard'],{relativeTo: this.route }); 
    })
  })
}


doFacebookLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.FacebookAuthProvider();
    this.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);      
      console.log("USER");
      this.userPhotoURL = this.user.photoURL;
      this.userName = this.user.displayName;

      this.prntUser()
      // console.log(this.user);
      this.router.navigate(['dashboard'],{relativeTo: this.route });       
    }, err => {
      console.log(err);
      reject(err);
    }) 
  })

}

doTwitterLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.TwitterAuthProvider();
    this.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
      this.router.navigate(['dashboard'],{relativeTo: this.route }); 
    }, err => {
      console.log(err);
      reject(err);
    })
  })
}

prntUser(){
  // new Promise<any>((resolve, reject) => {
// this.user.uid = res.user.uid;
      // this.user.displayName = res.user.displayName;
      // this.user.email = res.user.email;
      console.log(this.user);
      console.log(this.user.photoURL);
      // this.user.photoURL = this.user.photoURL;
    // })
    }
    
goto(){
  this.router.navigate(['dashboard'],{relativeTo: this.route }); 
}






}
