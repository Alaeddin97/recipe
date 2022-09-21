import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/Shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipeChanged=new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Big Fat Burger",
      "What else to say?",
      "https://www.cuisineactuelle.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2Fc7847cc3-6028-4609-ab50-065c275277fa.2Ejpeg/400x400/quality/80/crop-from/center/burger-maison.jpeg",
      [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
      ),
      new Recipe(
        "Italian PIZZA",
        "A super tasty Italian PIZZA, just awesome !",
        "https://www.selection.ca/wp-content/uploads/2012/11/recette-pizza-toute-garnie.jpg",
        [
          new Ingredient("Mozzarella", 4),
          new Ingredient("Tomatoes", 2),
          new Ingredient("mushroom", 1),
        ]
        ),
      ];
      
      constructor(private shoppingListService:ShoppingListService){}
     
      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
      }
      getRecipes() {
        return this.recipes.slice();
      }
      getRecipe(id:number){
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
        this.recipes[id]=arg1;
        this.recipeChanged.next(this.recipes.slice());
      }
      deleteRecipe(id: number) {
        this.recipes.splice(id,1);
        this.recipeChanged.next(this.recipes.slice());

      }
    }
    