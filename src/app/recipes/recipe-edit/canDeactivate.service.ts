import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface canComponentDeactivate{
canDeactivate():Observable<boolean>|Promise<boolean>|boolean;
}
@Injectable({providedIn:'root'})
export class canDeactivateGuard implements CanDeactivate<canComponentDeactivate>{
    canDeactivate(component: canComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canDeactivate();
    }
}