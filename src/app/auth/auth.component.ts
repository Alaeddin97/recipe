import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { AuthResponse } from "../shared/auth-response.model";
import { Observable } from "rxjs-compat";
import { Router } from "@angular/router";


@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{

    isAuthenticated=false;
    isLoginMode=true;
    isLoading=false;
    error:string=null;
    authObs:Observable<AuthResponse>;

    constructor(private authService:AuthService,private router:Router){}


    onSwichMode(){
        this.isLoginMode=!this.isLoginMode;
    }

    onSubmit(form:NgForm){
        this.isLoading=true;
        if(this.isLoginMode){
            this.authObs= this.authService.signin(form.value.email,form.value.password);
        }
        else{
            this.authObs= this.authService.signup(form.value.email,form.value.password);
        }

        this.authObs.subscribe(
            (response:AuthResponse)=>{
                console.log(response);
                this.isLoading=false;
                this.router.navigate(['./recipes']);
            },
            (errorMessage)=>{
                console.log(errorMessage);
                this.isLoading=false;
                this.error=errorMessage;
            }
        )

        form.reset();
    }

}