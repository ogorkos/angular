export class Client {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  notes: string = '';
  private _id: string = '';
  private timestamp: number
  // =new Date().getTime()

  fromObjectToClient(obj) {
    obj && Object.assign(this, obj);
    return this
  }
  
  toFirestore() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      notes: this.notes,
      id: this._id,
      timestamp: this.timestamp
    };
  }

  constructor(
    id: string = '',
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    phone: string = '',
    address: string = '',
    notes: string = '',
    timestamp: number = new Date().getTime()
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.notes = notes;
    this.timestamp = timestamp;
  }

  fromFirestore(doc): Client {   
    return new Client(
      doc.id,
      doc.data().firstName,
      doc.data().lastName,
      doc.data().email,
      doc.data().phone,
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
}
