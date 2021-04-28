import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiseService } from 'src/app/services/firebase-servise.service';

@Component({
  selector: 'app-set-data-firebase',
  templateUrl: './set-data-firebase.component.html',
  styleUrls: ['./set-data-firebase.component.css'],
})
export class SetDataFirebaseComponent implements OnInit {
  myForm: FormGroup;
  client: Client = new Client();
  idForEdit: string;
  edit: boolean = false;

  constructor(
    fb: FormBuilder,
    private fss: FirebaseServiseService,
    private _Activatedroute: ActivatedRoute, //считывает параметры из ссылки
    private router: Router, //нужно для ссылок на другие URL
    private route: ActivatedRoute //нужно для ссылок на другие URL
  ) {
    this.myForm = fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(7)]],
      notes: ['', []],
    });
  }

  ngOnInit(): void {
    //считываем параметры из ссылки:
    //http://localhost:4200/dashboard/setData?id=1

    this.route.queryParams.subscribe((params) => {
      console.log('params = ', params);
      if (params.collection && params.id) {
        this.getDataFromFirebase(params.collection, params.id);
        this.edit = true;
        this.idForEdit = params.id;
      }
    });

    //считываем параметры из ссылки в виде:
    // http://localhost:4200/dashboard/setData/1315
    // this._Activatedroute.params.subscribe(parameter => {
    //   console.log("parameter = ",parameter);
    // })
  }

  onSubmit(form: any) {
    form = new Client().fromObjectToClient(form);
    
    console.log('form');
    if (this.edit) {
      this.fss.updateDataToFirebase(form, 'clients', this.idForEdit);
      this.edit = false;
      this.router.navigate(['dashboard/getData']);
    } else {
      this.fss.addClient(form);
    }
    this.myForm.reset();
  }

  async getDataFromFirebase(collection: string, id: string) {
    this.client = await this.fss.getDataWithId(collection, id);
  }
}
