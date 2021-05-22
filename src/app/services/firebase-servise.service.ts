import { LoginService } from './login.service';
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
  addClientsStatus = new BehaviorSubject<string>(null);

  constructor(private db: AngularFirestore, private ls:LoginService) {}

  async addClient(client: Client) {
    // console.log(client);    
    const docRef = this.db.firestore.collection('clients').doc();
    client.id = docRef.id;
    // client.userId = this.ls.user.user.uid;
    // console.log(client.toFirestore());
    await docRef
      .set(client.toFirestore(), { merge: true })
      // docRef.set(client,{merge: true})
      .then((docRef) => {
        // console.log('Document written with ID: ', client.id);
        this.addClientsStatus.next('Success')
        // setTimeout(() => {
        //   this.addClientsStatus.next(null)
        // }, 1000);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        this.addClientsStatus.next('Error')        
      });
  }

  getDataFromFirebase(collection: string, refresh:boolean=false) {
    if (refresh){
      return new Promise<Client[]>( (resolve, reject) => {
        this.db.firestore.collection(collection)
        // .where("userId", "==", this.ls.user.user.uid)
        .onSnapshot((querySnapshot) => {
          this.clients=[]
          querySnapshot.forEach((doc) => {            
            this.clients.push(new Client().fromFirestore(doc));           
          });                      
          this.clientsStatus.next(this.clients)
          resolve(this.clients)  
        },(error) => {
          console.log(error);
          
      });
      })        
    }

    return new Promise<boolean>( (resolve, reject) => {
      
      if (this.clients.length>0) {
        this.clientsStatus.next(this.clients)
        resolve(true)
        return
      }
      
      this.db.firestore.collection(collection)
      // .where("userId", "==", this.ls.user.user.uid)
      .onSnapshot((querySnapshot) => {
        this.clients=[]
        
        querySnapshot.forEach((doc) => {
          this.clients.push(new Client().fromFirestore(doc));
          
        });
        // console.log(this.clients);        
        this.clientsStatus.next(this.clients)
        resolve(true)

    });
})
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
          // console.log(doc.data());
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
      // console.log(docRef.id);
      // console.log(client);
      client.id = docRef.id;
      docRef
        .set(client.toFirestore(), { merge: true })
        .then((docRef) => {
          // console.log('Document written with ID: ', docRef);
          this.addClientsStatus.next('Success')
          resolve(this.getDataFromFirebase(collection, true));
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          this.addClientsStatus.next('Error')
        });
    });
  }
}
