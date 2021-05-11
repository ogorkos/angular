import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ShowNavBarService } from 'src/app/services/show-nav-bar.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//   myForm : FormGroup = new FormGroup({
             
//     "name": new FormControl(),
//     "email": new FormControl(),
// });
  
  dataFromFireStore=[];
  dataFromFireStoreRes=[];

  constructor(private navServ:ShowNavBarService,
    private  firestore: AngularFirestore) { }

  ngOnInit(): void {
    // this.navServ.hideNavBar()    // чтобы отключить навигацию
 
 
  }

  // ngOnDestroy(): void {
  //   this.navServ.showNavBar()    // чтобы включить навигацию обратно при выходе
  // }


  // sendData(nameVal, emailVal){
  //   console.log(nameVal, emailVal);
    
  //   this.firestore.collection("users").add({
  //     name: nameVal,
  //     email: emailVal
  //   })
  //   .then((docRef) => {
  //       console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch((error) => {
  //       console.error("Error adding document: ", error);
  //   });
  // }

  // getDataFromFireStore(){
  //   this.firestore.firestore.collection("users").get().then((querySnapshot) => {
  //     this.dataFromFireStore = [];
  //     querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id}`);
  //         console.log(doc.data());

  //         const obj = Object.keys(doc.data()).map((key) => [key+" : ", doc.data()[key]])
  //         console.log(obj);
          
  //         this.dataFromFireStore.push(obj)          
  //       });
  //       console.log(this.dataFromFireStore);
        
  //     })
  // }

}
