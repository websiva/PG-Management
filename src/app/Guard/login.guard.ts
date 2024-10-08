import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn:'root'
})

export class loginGuard implements CanActivate{

  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot):boolean {
    const expectedRole = route.data['expectedRole'];
    const isLoggedIn = localStorage.getItem("isLoggedIn")==="true";
    const userLevel = localStorage.getItem("userLevel");

    if(isLoggedIn&&userLevel===expectedRole){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }

  }
}