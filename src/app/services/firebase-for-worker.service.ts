import { LoginService } from './login.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Worker } from '../models/worker';

@Injectable({
  providedIn: 'root'
})
export class FirebaseForWorkerService {

  workers: Worker[] = [];
  workersStatus = new BehaviorSubject<Worker[]>([]);
  addWorkerStatus = new BehaviorSubject<string>(null);

  constructor(private db: AngularFirestore, private ls:LoginService) {}

  async addWorker(worker: Worker) {
    // console.log(worker);    
    const docRef = this.db.firestore.collection('workers').doc();
    worker.id = docRef.id;
    // console.log(worker.toFirestore());
    await docRef
      .set(worker.toFirestore(), { merge: true })
      .then((docRef) => {
        console.log('Document written with ID: ', worker.id);
        this.addWorkerStatus.next('Success')
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        this.addWorkerStatus.next('Error')        
      });
  }

  getDataFromFirebase(collection: string, refresh:boolean=false) {
    if (refresh){
      return new Promise<Worker[]>( (resolve, reject) => {
        this.db.firestore.collection(collection)
        .onSnapshot((querySnapshot) => {
          this.workers=[]
          querySnapshot.forEach((doc) => {            
            
            this.workers.push(new Worker().fromFirestore(doc));           
          });                      
          this.workersStatus.next(this.workers)
          resolve(this.workers)  
        },(error) => {
          console.log(error);
          
      });
      })        
    }

    return new Promise<boolean>( (resolve, reject) => {      
      if (this.workers.length>0) {
        this.workersStatus.next(this.workers)
        resolve(true)
        return
      }      
      this.db.firestore.collection(collection)
      .onSnapshot((querySnapshot) => {
        this.workers=[]        
        querySnapshot.forEach((doc) => {
          this.workers.push(new Worker().fromFirestore(doc));          
        });
        console.log(this.workers);        
        this.workersStatus.next(this.workers)
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
  // getDataWithId(collection: string, id: string) {
  //   return new Promise<any>((resolve, reject) => {
  //     const alovelaceDocumentRef = this.db.firestore
  //       .collection(collection)
  //       .doc(id);
  //     alovelaceDocumentRef
  //       .get()
  //       .then((doc) => {
  //         console.log(doc.data());
  //         resolve(doc.data());
  //       })
  //       .catch((error) => {
  //         console.error('Error adding document: ', error);
  //       });
  //   });
  // }

  updateDataToFirebase(worker: Worker, collection: string, id: string) {
    return new Promise<any>((resolve, reject) => {
      const docRef = this.db.firestore.collection(collection).doc(id);
      console.log(docRef.id);
      console.log(worker);
      worker.id = docRef.id;
      docRef
        .set(worker.toFirestore(), { merge: true })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef);
          this.addWorkerStatus.next('Success')
          resolve(this.getDataFromFirebase(collection, true));
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          this.addWorkerStatus.next('Error')
        });
    });
  }
}

