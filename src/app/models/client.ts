export class Client {
  firstName:string = "";
  lastName:string = "";
  email:string = "";
  phone:string = "";
  address:string = "";
  notes:string = "";
  private _id:string = ""


  constructor(
    id:string="",
    firstName:string="",
    lastName:string="",
    email:string="",
    phone:string="",
    address:string="",
    notes:string=""){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.phone=phone;
        this.address=address;
        this.notes=notes
    }

  toFirestore():any{
    return {
      firstName:this.firstName,
      lastName:this.lastName,
      email:this.email,
      phone:this.phone,
      address:this.address,
      notes:this.notes,
      id:this._id
    }
  }

  fromFirestore(doc):Client{   
    return new Client(doc.id,
        doc.data().firstName,
        doc.data().lastName,
        doc.data().email,
        doc.data().phone,
        doc.data().address,
        doc.data().notes
        )
}


  get id():string{
    return this._id
  }

  set id(val:string){
    this._id = val 
  }
}