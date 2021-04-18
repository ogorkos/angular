import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiseService } from 'src/app/services/firebase-servise.service';
import {Client} from '../../models/client'

@Component({
  selector: 'app-get-data-firebase',
  templateUrl: './get-data-firebase.component.html',
  styleUrls: ['./get-data-firebase.component.css']
})
export class GetDataFirebaseComponent implements OnInit {
  
  clients:Client

  constructor(
    private fss:FirebaseServiseService,
    public router:Router,
    public route:ActivatedRoute,) { 
    // this.myForm = new Client;
  }

  ngOnInit(): void {

  }

  async getDataFromFirebase(){
    this.clients = await this.fss.getDataFromFirebase("clients");
}

  async delete(id:string){
    this.clients = await this.fss.deleteDataFromFirestore("clients", id);    
}

  async edit(id:string){         
    this.router.navigate(['dashboard/setData'], { queryParams: { id: id, collection: "clients" } });        
}
}
