import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class IfUserLogin implements CanActivate {
  constructor(private loginServ:LoginService) {}
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    if (this.loginServ.user){
      return true
    } else return false
    // return true
    // return false
  }
}