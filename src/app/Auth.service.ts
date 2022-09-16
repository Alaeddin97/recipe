import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class AuthService{
isLoggedIn=false;
isAuthenticated(){
    const promise=new Promise(
        (resolve,reject)=>{

            setTimeout(()=>{
                 resolve(this.isLoggedIn);
            },100)
        }
    )
    return promise;
}

onLoggedIn(){
    this.isLoggedIn=true;
}

onLogOut(){
    this.isLoggedIn=false;
}
}