import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-test-firestore',
  templateUrl: './test-firestore.component.html',
  styleUrls: ['./test-firestore.component.css']
})
export class TestFirestoreComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }


  /**
   * Rules for Firestore:
   * 
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
          
    }
  }
}
   */


    getUpdate(){
      
    }

    setDataToFirebase(): void {
      var citiesRef = this.db.collection("cities");

      citiesRef.doc("SF").set({
          name: "San Francisco", state: "CA", country: "USA",
          capital: false, population: 860000,
          regions: ["west_coast", "norcal"] });
      citiesRef.doc("LA").set({
          name: "Los Angeles", state: "CA", country: "USA",
          capital: false, population: 3900000,
          regions: ["west_coast", "socal"] });
      citiesRef.doc("DC").set({
          name: "Washington, D.C.", state: null, country: "USA",
          capital: true, population: 680000,
          regions: ["east_coast"] });
      citiesRef.doc("TOK").set({
          name: "Tokyo", state: null, country: "Japan",
          capital: true, population: 9000000,
          regions: ["kanto", "honshu"] });
      citiesRef.doc("BJ").set({
          name: "Beijing", state: null, country: "China",
          capital: true, population: 21500000,
          regions: ["jingjinji", "hebei"] });

  }

  updateDataToFirebase(){
    const docRef=this.db.firestore.collection("users").doc()
    console.log(docRef.id)
    docRef.set({
      id:docRef.id,
      first: "Gena",
        middle: "-",
        last: "Utkin",
        born: 2020
  },{merge: true})
  .then((docRef) => {
      console.log("Document written with ID: ", docRef);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
  }


/**
 * Получить все из коллекции по определенным условиям:
 * (Необходимо сделать индексацию данных)
 */

  getDataFromFirebase(){
    this.db.firestore.collection("cities").where("state", "==", "CA").where("population", "<", 1000000)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

          /**
           *Получить все документы из коллекции:
          */

  //   const users= this.db.firestore.collection("users")
  //   users.get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //         console.log(doc.data());
  //     });
  // });



          /**
           *Получить данные по id документа:
          */

  // var alovelaceDocumentRef = this.db.firestore.collection('users').doc('7TWjtyrZWoAReygBgndi');
  // alovelaceDocumentRef.get().then(doc=>{
  //   console.log('------------------')
  //   console.log(doc.data())

  // }).catch((error) => {
  //   console.error("Error adding document: ", error);
  // });

          /**
           * Второй вариант - в указать адресс в путе к файлу
           */

  // const docId='7TWjtyrZWoAReygBgndi'
  // var alovelaceDocumentRef = this.db.firestore.doc('users/'+docId);
  // alovelaceDocumentRef.get().then(doc=>{
  //   console.log('------------------')
  //   console.log(doc.data())

  // }).catch((error) => {
  //   console.error("Error adding document: ", error);
  // });

  }

  deleteDataToFirebase(){
    this.db.collection("users").doc("7TWjtyrZWoAReygBgndi").delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

}
