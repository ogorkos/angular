import { PlusMinusService } from './../services/plus-minus.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.css']
})
export class PlusMinusComponent implements OnInit {
  number:number=0;
  titleMinus:string='-'
  titlePlus:string='+'
  numbersExemples:number[]=[1,10,15,20,50,80,100]
  bigNum:boolean=false

  constructor(
    private pm:PlusMinusService,            //подключаем сервис (PlusMinusService) и записываем его в переменную (pm)
    private _Activatedroute:ActivatedRoute, //считывает параметры из ссылки
    private router:Router,                  //нужно для ссылок на другие URL
    private route: ActivatedRoute           //нужно для ссылок на другие URL
    ) { }

  Plus:boolean

  ngOnInit(): void {
       
    //считываем параметры из ссылки:
    this._Activatedroute.params.subscribe(parameter => {
      if  (parameter.number ){
        this.number = +parameter.number
        this.pm.setNum(this.number)
      } else this.number=this.pm.getPM();
      this.number>100 ? this.bigNum=true : this.bigNum=false
      
    }) 
  }
  
  printNumber(number:number){
    this.number=number;
    this.pm.setNum(number)

    this.number>100 ? this.bigNum=true : this.bigNum=false
  }

  setNumber(num){
    num>100 ? this.bigNum=true : this.bigNum=false

    this.number=num;
    this.pm.setNum(this.number)
    this.router.navigate(['/plusminus'],{relativeTo: this.route })   
    //переадресация на другой URL (/plusminus),  relativeTo: this.route значит что переадресацию делаем на данный сайт
  }

}