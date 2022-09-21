import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ShoppingListService } from "../shopping-list/Shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredients(recipe: Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients);
  }
  addRecipe(arg0: Recipe) {
    this.recipes.push(arg0);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(id: number, arg1: Recipe) {
    this.recipes[id] = arg1;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
