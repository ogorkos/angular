export class Worker {
   firstName: string = '';
   lastName: string = '';
   email: string = '';
   birthday: string = '';
   phones = []; // чтобы было несколько ном тел
   address: string = '';
   notes: string = '';
   private _id: string = '';
  //  private _userId: string = '';
   private timestamp: number
   
 
   fromObjectToWorker(obj) {
     obj && Object.assign(this, obj);
     return this
   }
   
   toFirestore() {
     return {
       firstName: this.firstName,
       lastName: this.lastName,
       email: this.email,
       birthday:this.birthday,
       phones: this.phones,
       address: this.address,
       notes: this.notes,
       id: this._id,
      //  userId:this._userId,
       timestamp: this.timestamp
     };
   }
 
   constructor(
     id: string = '',
     firstName: string = '',
     lastName: string = '',
     email: string = '',
     birthday: string = '',
     phones = [],
     address: string = '',
     notes: string = '',
    //  userId:string = '',
     timestamp: number = new Date().getTime()
   ) {
     this.id = id;
     this.firstName = firstName;
     this.lastName = lastName;
     this.email = email;
     this.birthday = birthday;
     this.phones = phones;
     this.address = address;
     this.notes = notes;
    //  this.userId = userId;
     this.timestamp = timestamp;
   }
 
   fromFirestore(doc): Worker {   
     return new Worker(
       doc.id,
       doc.data().firstName,
       doc.data().lastName,
       doc.data().email,
       doc.data().birthday,
       doc.data().phones,
       doc.data().address,
       doc.data().notes,
       doc.data().timestamp ? doc.data().timestamp : new Date().getTime()
     );
   }
 
   get id(): string {
     return this._id;
   }
 
   set id(val: string) {
     this._id = val;
   }
 
  //  get userId(): string {
  //    return this._id;
  //  }
 
  //  set userId(val: string) {
  //    this._userId = val;
  //  }
 }
 