import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiseService {
  clients: Client[] = [];
  clientsStatus = new BehaviorSubject<Client[]>([]);

  constructor(private db: AngularFirestore) {}

  addClient(client: Client) {
    const docRef = this.db.firestore.collection('clients').doc();
    client.id = docRef.id;
    console.log(client.toFirestore());
    docRef
      .set(client.toFirestore(), { merge: true })
      // docRef.set(client,{merge: true})
      .then((docRef) => {
        console.log('Document written with ID: ', client.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  getDataFromFirebase(collection: string, refresh:boolean=false) {
    if (refresh){
      return new Promise<Client[]>( (resolve, reject) => {
        this.db.firestore.collection(collection).onSnapshot((querySnapshot) => {
          this.clients=[]
          querySnapshot.forEach((doc) => {
            this.clients.push(new Client().fromFirestore(doc));           
          });
          this.clientsStatus.next(this.clients)
        });
        resolve(this.clients)  
      })        
    }

    return new Promise<boolean>( (resolve, reject) => {
      
      if (this.clients.length>0) {
        this.clientsStatus.next(this.clients)
        resolve(true)
        return
      }
      
      this.db.firestore.collection(collection).onSnapshot((querySnapshot) => {
        this.clients=[]
        console.log(this.clients);
        
        querySnapshot.forEach((doc) => {
          this.clients.push(new Client().fromFirestore(doc));
       
        });
        this.clientsStatus.next(this.clients)
        resolve(true)

    });
})

    // return new Promise<any>((resolve, reject) => {
    //   const data = [];
    //   this.db.firestore
    //     .collection(collection)
    //     // .where("state", "==", "CA").where("population", "<", 1000000)
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.data());            
    //         data.push(doc.data());
    //       });
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       console.log('Error getting documents: ', error);
    //     });
    // });
  }

  deleteDataFromFirestore(collection: string, id: string) {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection(collection)
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');          
          resolve(this.getDataFromFirebase(collection, true));
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    });
  }

  //нужно переписать так как у нас есть данные по этому клиенту
  getDataWithId(collection: string, id: string) {
    return new Promise<any>((resolve, reject) => {
      const alovelaceDocumentRef = this.db.firestore
        .collection(collection)
        .doc(id);
      alovelaceDocumentRef
        .get()
        .then((doc) => {
          console.log(doc.data());
          resolve(doc.data());
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    });
  }

  updateDataToFirebase(client: Client, collection: string, id: string) {
    return new Promise<any>((resolve, reject) => {
      const docRef = this.db.firestore.collection(collection).doc(id);
      console.log(docRef.id);
      console.log(client);
      client.id = docRef.id;
      docRef
        .set(client.toFirestore(), { merge: true })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef);
          resolve(this.getDataFromFirebase(collection, true));
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    });
  }
}
