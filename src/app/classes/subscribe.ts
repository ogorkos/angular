export class Subscribe {

    _email: string;
    _firstName: string="";
    _lastName: string;
    _address: string;
    _id: string;
    
    
    
    constructor(
        email: string="",
        firstName: string="",
        lastName: string="",
        address:string="",
        id?: string
    
    ) {
    this._email = email;
    
    this._firstName = firstName;
    
    this._lastName = lastName;
    this._address=address
    
    this._id = id || new Date().getTime().toString();
    
    }

    get firstName():string {
        return this._firstName.toUpperCase()}
    set firstName(val){
        this.firstName=val}
        
    get email():string {
        return this._email}
    set email(val){
        this.email=val}

    get lastName():string {
        return this.lastName}
    set lastName(val){
        this.lastName=val}
    
    get address():string {
        return this._id}
    set address(val){
        this.address=val}
        
    }


   