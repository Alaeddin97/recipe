import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { RecipeService } from "./recipe.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class recipesResolverService implements Resolve<Recipe[]>{
    
    constructor(private recipeService:RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        if(this.recipeService.getRecipes().length==0){

            return this.recipeService.fetchRecipes();
        }else{
            return this.recipeService.getRecipes();
        }
    }
}