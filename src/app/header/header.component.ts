import { Component, OnInit } from "@angular/core";
import { AuthService } from "../Auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class headerComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataStorage:DataStorageService
  ) {}
  collapsed = true;
  ngOnInit() {
  }
  isLogIn() {
    this.authService.onLoggedIn();
  }
  isLogOut() {
    this.authService.onLogOut();
  }
  fetchData() {
   this.dataStorage.fetchRecipe().subscribe();
  }
  savaData(){
    this.dataStorage.storeRecipes();
  }
}
