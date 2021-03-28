import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-btn-numbers',
  templateUrl: './btn-numbers.component.html',
  styleUrls: ['./btn-numbers.component.css']
})
export class BtnNumbersComponent implements OnInit {

  @Input() numValue:number
  constructor ( 
    private _Activatedroute:ActivatedRoute,
    private router:Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  setNum(){
    this.router.navigate(['/plusminus/'+this.numValue],{relativeTo: this.route })
  }
}
