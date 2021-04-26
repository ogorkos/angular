import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiseService {

  client: Client[] = [];
  clientsStatus = new BehaviorSubject<Client>(new Client);

  constructor(private db:AngularFirestore) { }

  addClient(client:Client){
    const docRef=this.db.firestore.collection("clients").doc()
    client.id = docRef.id
    // console.log("client.toFirestore()");
    console.log(client)
    // console.log(client.toFirestore());
    
    docRef.set(client,{merge: true})
  .then((docRef) => {
      console.log("Document written with ID: ", client.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
  }

  getDataFromFirebase(collection:string){
    return new Promise<any>((resolve, reject) => {
    const data=[]
    this.db.firestore.collection(collection)
    // .where("state", "==", "CA").where("population", "<", 1000000)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              data.push(doc.data())
          });
          resolve(data) 
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    })
}

  deleteDataFromFirestore(collection:string, id:string){
    return new Promise<any>((resolve, reject) => {
      this.db.collection(collection).doc(id).delete()
      .then(() => {
        console.log("Document successfully deleted!");
        resolve(this.getDataFromFirebase(collection))
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });    
    })
  }
  
 //нужно переписать так как у нас есть данные по этому клиенту
  getDataWithId(collection:string, id:string){
    return new Promise<any>((resolve, reject) => {
      const alovelaceDocumentRef = this.db.firestore.collection(collection).doc(id);
    alovelaceDocumentRef.get().then(doc=>{
      console.log(doc.data())
      resolve(doc.data())  
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
    })
  }

  updateDataToFirebase(client:Client,collection:string, id:string){
    return new Promise<any>((resolve, reject) => {
     
      const docRef=this.db.firestore.collection(collection).doc(id)
      console.log(docRef.id)
      console.log(client);
      client.id = docRef.id
      docRef.set(client,{merge: true})
    .then((docRef) => {
        console.log("Document written with ID: ", docRef);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    })
  }   



}
