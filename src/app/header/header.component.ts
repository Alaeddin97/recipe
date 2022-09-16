import { Component} from "@angular/core";
import {  Router } from "@angular/router";
import { AuthService } from "../Auth.service";

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.css']
})
export class headerComponent {
  constructor(private authService:AuthService){ }
    collapsed = true;
    isLogIn(){
      this.authService.onLoggedIn();
    }
    isLogOut(){
      this.authService.onLogOut();
    }
}
