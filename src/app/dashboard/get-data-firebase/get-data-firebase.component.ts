import { SpinnerService } from './../../services/spinner.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiseService } from 'src/app/services/firebase-servise.service';
import {Client} from '../../models/client'

@Component({
  selector: 'app-get-data-firebase',
  templateUrl: './get-data-firebase.component.html',
  styleUrls: ['./get-data-firebase.component.css']
})
export class GetDataFirebaseComponent implements OnInit {
  
  clients:Client[]=[]
  searchArr:Client[] = []
  searchTerm:string

  constructor(
    private fss:FirebaseServiseService,
    public router:Router,
    public route:ActivatedRoute,
    private spinServ:SpinnerService
    ) { 
    // this.myForm = new Client;
  }

  ngOnInit(): void {
    // this.getDataFromFirebase();
  }

  ngAfterContentInit(): void {
    this.getDataFromFirebase()
  }

  async getDataFromFirebase(){
    this.spinServ.showSpinnerFunc(true)
    await this.fss.getDataFromFirebase("clients");
    this.spinServ.showSpinnerFunc(false)
    this.fss.clientsStatus.subscribe((arr:Client[])=>{
      this.clients = arr
    })
    }

  async delete(id:string){
    this.spinServ.showSpinnerFunc(true)
    this.clients = await this.fss.deleteDataFromFirestore("clients", id);    
    setTimeout(() => {
      this.getDataFromFirebase();
    }, 1000);
    if (this.searchArr.length>0){
      this.searchArr = [];
      // this.search.nativeElement.value=""
    }
        this.spinServ.showSpinnerFunc(false)
    }

  editOrShowClient(id:string, editOrShow:string){         
    this.router.navigate(['dashboard/setData'], { queryParams: { id: id, collection: "clients" , editOrShow: editOrShow} });        
  }

  // showClient(clientId:string){
  //   this.router.navigate([clientId],{ relativeTo: this.route });
  // }

// searchChanged(str:string){
  // str=str.toLowerCase()
  // const arr = this.clients.filter((elem)=> {
  //   return (elem.firstName.toLowerCase().includes(str) || elem.lastName.toLowerCase().includes(str) || elem.email.toLowerCase().includes(str)
  //    || elem.phone.toLowerCase().includes(str) || elem.address.toLowerCase().includes(str) || elem.notes.toLowerCase().includes(str))
  // });
  // this.searchArr = arr;

  // this.clients=(this.clients | searchPipe:)
// }



}
