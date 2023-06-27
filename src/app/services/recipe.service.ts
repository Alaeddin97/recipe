import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[]
    = [];

  recipesChanged = new Subject<Recipe[]>();


  constructor(private http: HttpClient, private authService: AuthService) { }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  editRecipe(recipe: Recipe, index: number) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  delete(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  saveRecipes() {
    this.http.put('https://recipe-book-aladin-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      this.recipes)
      .subscribe()
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://recipe-book-aladin-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      ).pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
          this.setRecipes(recipes);
        }
        ))
  }

}
