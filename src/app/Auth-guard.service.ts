import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./Auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.authService.isAuthenticated().then(
        (isLoggedIn:boolean)=>{
            if(isLoggedIn){
                return true;
            }else{
               alert('You have to log in first?');
            }
        }
       )
    }
}