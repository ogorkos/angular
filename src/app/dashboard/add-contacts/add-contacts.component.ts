import { Worker } from './../../models/worker';
import { Component, ViewEncapsulation, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseForWorkerService } from 'src/app/services/firebase-for-worker.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-contacts.component.css']
})
export class AddContactsComponent implements OnInit {
  title:string="Add";
  myForm: FormGroup;
  worker: Worker = new Worker();
  idForEdit: string;
  edit: boolean = false;
  show: boolean = false;
  readonly: boolean = false;
  addWorkerStat:string=null;
  successfully:string=null;
  showSpinner:boolean = false;
  @ViewChild('content') content:ElementRef;
  phones: FormArray;

  constructor(
    private fb: FormBuilder,
    private fss: FirebaseForWorkerService,
    private spinServ:SpinnerService,
    private modalService: NgbModal, //для модального окна о поддтверждении добавления записи в бд
    private _Activatedroute: ActivatedRoute, //считывает параметры из ссылки
    private router: Router, //нужно для ссылок на другие URL
    private route: ActivatedRoute //нужно для ссылок на другие URL
  ) { 
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],    
      birthday: [''],    
      phones: 
      this.fb.array([], [Validators.required]),
      address: ['', [Validators.required, Validators.minLength(7)]],
      notes: ['', []],
    });    
    
    this.fss.addWorkerStatus.subscribe((addWorkerStat:string) => {this.addWorkerStat = addWorkerStat})

    this.fss.addWorkerStatus.subscribe((addWorkerStat:string) => {this.addWorkerStat = addWorkerStat})
    // this.route.params.subscribe(params => {     
    //   if (params['id']){ this.getCustomer(params['id'])} });

//считываем параметры из ссылки:
    //http://localhost:4200/dashboard/setData?id=0oMoZwipcV8n4WZ7BoM5&collection=clients&editOrShow=edit

    this.route.queryParams.subscribe((params) => {
      if (params.collection && params.id) {
        this.getWorker(params.id)
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
      } else this.addPhone();
    });


  }
  ngAfterViewInit(): void {
    this.spinServ.showSpinner.subscribe((value) => {   
      setTimeout(() => {
        this.showSpinner = value
        if (this.addWorkerStat)  {
          this.modalWin(this.content)  
          this.successfully = this.addWorkerStat;
          this.fss.addWorkerStatus.next(null)
        }
      }, 1); 
    })
  }

  addPhone(){
    const fa = (this.myForm.get('phones')as FormArray);
    fa.push(this.fb.group({
      name: ['', [Validators.required, Validators.minLength(9)]]
    }));
  }
  deletePhone(i:number){
    const fa = (this.myForm.get('phones')as FormArray);
    fa.removeAt(i);
    if(fa.length===0) this.addPhone();
  }

  getWorker(id: string){
    const worker = this.fss.workers.find(cl => cl.id === id)
    this.fillWorkerInInput(worker)      
    if (worker){this.worker = worker}       
  }  

  fillWorkerInInput(worker:Worker){
    this.myForm.patchValue(worker);        
    worker.phones.forEach(el => {
      const fa = (this.myForm.get('phones')as FormArray);
      fa.push(this.fb.group({
        name: [el.name, [Validators.required, Validators.minLength(9)]]
      }));
    })    
  }

  closeShow(){
    this.show = false;
      this.router.navigate(['dashboard/viewContacts']);
  }


  async onSubmit(form: any) {
    form = new Worker().fromObjectToWorker(form);    
    if (this.edit) {
      this.spinServ.showSpinnerFunc(true)
      await this.fss.updateDataToFirebase(form, 'workers', this.idForEdit);
      this.spinServ.showSpinnerFunc(false)
      this.edit = false;
      this.router.navigate(['dashboard/viewContacts']);
    } else {
      this.spinServ.showSpinnerFunc(true)
      await this.fss.addWorker(form);
      this.spinServ.showSpinnerFunc(false)
      this.myForm.reset();
    }
  }
  
 
  //Open and close Modal Window
  modalWin(content:any){
    this.spinServ.showSpinnerFunc(false)
      this.modalService.open(content)
      
      setTimeout(() => {
        this.modalService.dismissAll(content)   
        this.successfully = null   
      }, 2000);
  }


  // test(){
  //   console.log(this.myForm);
  // }
}
