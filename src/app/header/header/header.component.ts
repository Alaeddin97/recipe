import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import {Subscription} from 'rxjs/Subscription';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  
  userSub:Subscription;
  isAuthenticated=false;

  constructor(private recipeService:RecipeService,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.userData.subscribe(
      user=>{
        this.isAuthenticated=!!user;
      }
    )
  }

  onSave(){
    this.recipeService.saveRecipes();
  }
  onFetch(){
    this.recipeService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
