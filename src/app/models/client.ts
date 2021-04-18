export class Client {
  firstName:string = "";
  lastName:string = "";
  email:string = "";
  phone:string = "";
  address:string = "";
  notes:string = "";
  private _id:string = ""

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

  get id():string{
    return this._id
  }

  set id(val:string){
    this._id = val
  }
}