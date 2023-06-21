import { Component, OnInit} from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[];
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
      }
    )
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  
}
