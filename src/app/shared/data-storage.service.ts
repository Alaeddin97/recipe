import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/Recipe.service";
import { map, tap } from "rxjs/operators";
import { RecipesComponent } from "../recipes/recipes.component";
@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        "https://recipe-book-a3f89-default-rtdb.europe-west1.firebasedatabase.app/recipe.json",
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipe() {
    return (
      this.http
        .get<Recipe[]>(
          "https://recipe-book-a3f89-default-rtdb.europe-west1.firebasedatabase.app/recipe.json"
        )
        .pipe(
          map((recipes) => {
            recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
            this.recipeService.setRecipes(recipes)
            return recipes;
          })
        )
    );
  }
}
