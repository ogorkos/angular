import { Client } from './../../models/client';
import { Component, ViewEncapsulation, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiseService } from 'src/app/services/firebase-servise.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-set-data-firebase',
  templateUrl: './set-data-firebase.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./set-data-firebase.component.css'],
})
export class SetDataFirebaseComponent implements OnInit {
  title:string="Add";
  myForm: FormGroup;
  client: Client = new Client();
  idForEdit: string;
  edit: boolean = false;
  show: boolean = false;
  readonly: boolean = false;
  addClientsStat:string=null;
  successfully:string=null
  showSpinner:boolean = false;
  @ViewChild('content') content:ElementRef

  constructor(
    fb: FormBuilder,
    private fss: FirebaseServiseService,
    private spinServ:SpinnerService,
    private modalService: NgbModal, //для модального окна о поддтверждении добавления записи в бд
    private _Activatedroute: ActivatedRoute, //считывает параметры из ссылки
    private router: Router, //нужно для ссылок на другие URL
    private route: ActivatedRoute //нужно для ссылок на другие URL
  ) {
    this.myForm = fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      address: ['', [Validators.required, Validators.minLength(7)]],
      notes: ['', []],
    });
  }

  ngOnInit(): void {
    this.fss.addClientsStatus.subscribe((addClientsStat:string) => {this.addClientsStat = addClientsStat})
    this.route.params.subscribe(params => {     
      if (params['id']){ this.getCustomer(params['id'])} });

    //считываем параметры из ссылки:
    //http://localhost:4200/dashboard/setData?id=0oMoZwipcV8n4WZ7BoM5&collection=clients&editOrShow=edit

    this.route.queryParams.subscribe((params) => {
      if (params.collection && params.id) {
        this.getCustomer(params.id)
        // this.getDataFromFirebase(params.collection, params.id);
        if (params.editOrShow ==="edit") {          
          this.edit = true;
          this.title = "Edit"
        } else {
          this.show = true ;
          this.title = "View"
          this.myForm.disable()
          this.readonly = true;
        }
        this.idForEdit = params.id;
      }
    });

    // считываем параметры из ссылки в виде:
    // http://localhost:4200/dashboard/setData/1315
    // this._Activatedroute.params.subscribe(parameter => {
    //   console.log("parameter = ",parameter);
    // })
  }
  ngAfterViewInit(): void {
    this.spinServ.showSpinner.subscribe((value) => {   
      setTimeout(() => {
        this.showSpinner = value
        if (this.addClientsStat)  {
          this.modalWin(this.content)  
          this.successfully = this.addClientsStat;
          this.fss.addClientsStatus.next(null)
        }
      }, 1); 
    })
  }

  getCustomer(id: string){
    const client = this.fss.clients.find(cl => cl.id === id)
    this.fillClientInInput(client)      
    if (client){this.client = client}       
  }  

  fillClientInInput(client:Client){
    this.myForm.patchValue({
      firstName:client.firstName,
      lastName: client.lastName,
      email: client.email, 
      phone: client.phone, 
      address: client.address,
      notes: client.notes,
    })
  }

  closeShow(){
    this.show = false;
      this.router.navigate(['dashboard/getData']);
  }

  async onSubmit(form: any) {
    form = new Client().fromObjectToClient(form);    
    // if (this.show) {
    //   this.show = false;
    //   this.router.navigate(['dashboard/getData']);
    // }
    if (this.edit) {
      this.spinServ.showSpinnerFunc(true)
      await this.fss.updateDataToFirebase(form, 'clients', this.idForEdit);
      this.spinServ.showSpinnerFunc(false)
      this.edit = false;
      this.router.navigate(['dashboard/getData']);
    } 
    else {
      this.spinServ.showSpinnerFunc(true)
      await this.fss.addClient(form);
      this.spinServ.showSpinnerFunc(false)
      this.myForm.reset();
    }
  }
  
  async getDataFromFirebase(collection: string, id: string) {
    this.client = await this.fss.getDataWithId(collection, id);
  }
  
  // openVerticallyCentered(content) {
  //   this.modalService.open(content, { centered: true });   
  // }

  // closeModal(){
  //   this.fss.addClientsStatus.next(null)
  // }


  //открывает и закрывает модальное окно
  modalWin(content){
    this.spinServ.showSpinnerFunc(false)
    this.modalService.open(content);      
    setTimeout(() => {
      this.modalService.dismissAll(content)   
      this.successfully = null   
    }, 2000);
  }
}
