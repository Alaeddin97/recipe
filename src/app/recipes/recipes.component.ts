import { Component, OnInit,OnDestroy } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipe:Recipe;
  constructor(private recipeService:RecipeService) { }


  ngOnInit(): void {
  }

}
