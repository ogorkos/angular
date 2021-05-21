import { Worker } from './../../models/worker';
import { SpinnerService } from './../../services/spinner.service';
import { AfterContentInit, Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseForWorkerService } from 'src/app/services/firebase-for-worker.service';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit {

  workers:Worker[]=[]
  searchArr:Worker[] = []
  searchTerm:string;
  workerIdToDel:string = ""

  constructor(
    private fss:FirebaseForWorkerService,
    public router:Router,
    public route:ActivatedRoute,
    private spinServ:SpinnerService,
    private modalService: NgbModal
    ) { 
  }

  ngOnInit(): void {
    this.fss.workersStatus.subscribe((arr:Worker[])=>{this.workers = arr})
  }

  ngAfterContentInit(): void {
    this.getDataFromFirebase()
      
  }

  async getDataFromFirebase(){
    this.spinServ.showSpinnerFunc(true)
    await this.fss.getDataFromFirebase("workers");
    this.spinServ.showSpinnerFunc(false)
    this.fss.workersStatus.subscribe((arr:Worker[])=>{this.workers = arr})
  }

  confirmDelete(event, id:string){
    event.stopPropagation()
    this.workerIdToDel = id;
   } 

  async delete(){
    this.spinServ.showSpinnerFunc(true)
    this.workers = await this.fss.deleteDataFromFirestore("workers", this.workerIdToDel);    
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


  editOrShowWorker(event, id:string, editOrShow:string){         
    event.stopPropagation()
    this.router.navigate(['dashboard/addContacts'], { queryParams: { id: id, collection: "workers" , editOrShow: editOrShow} });        
  }

  sendMail(event, email){
    event.stopPropagation()
    window.open(`mailto:${email}`)
  }
 

}
