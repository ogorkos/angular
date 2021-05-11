import { SpinnerService } from './../../services/spinner.service';
import { AfterContentInit, Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiseService } from 'src/app/services/firebase-servise.service';
import {Client} from '../../models/client'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-get-data-firebase',
  templateUrl: './get-data-firebase.component.html',
  styleUrls: ['./get-data-firebase.component.css']
})
export class GetDataFirebaseComponent implements OnInit,AfterContentInit {
  
  clients:Client[]=[]
  searchArr:Client[] = []
  searchTerm:string;
  clientIdToDel:string = ""

  constructor(
    private fss:FirebaseServiseService,
    public router:Router,
    public route:ActivatedRoute,
    private spinServ:SpinnerService,
    private modalService: NgbModal
    ) { 
  }

  ngOnInit(): void {
    this.fss.clientsStatus.subscribe((arr:Client[])=>{this.clients = arr})
  }

  ngAfterContentInit(): void {
    this.getDataFromFirebase()
      
  }

  async getDataFromFirebase(){
    this.spinServ.showSpinnerFunc(true)
    await this.fss.getDataFromFirebase("clients");
    this.spinServ.showSpinnerFunc(false)
    this.fss.clientsStatus.subscribe((arr:Client[])=>{this.clients = arr})
  }

  confirmDelete(event, id:string){
    event.stopPropagation()
    this.clientIdToDel = id;
   } 

  async delete(){
    this.spinServ.showSpinnerFunc(true)
    this.clients = await this.fss.deleteDataFromFirestore("clients", this.clientIdToDel);    
    setTimeout(() => {
      this.getDataFromFirebase();
    }, 1);
    if (this.searchArr.length>0){
      this.searchArr = [];
    }
        this.spinServ.showSpinnerFunc(false)
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


  editOrShowClient(event, id:string, editOrShow:string){         
    event.stopPropagation()
    this.router.navigate(['dashboard/setData'], { queryParams: { id: id, collection: "clients" , editOrShow: editOrShow} });        
  }




}
