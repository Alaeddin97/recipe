import { Component, OnInit,Input } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import {ActivatedRoute,Params,Router} from '@angular/router'
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


  recipe:Recipe;
  id:number;
  constructor(
    private shoppingListService:ShoppingListService,
    private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recipe=this.recipeService.getRecipe(+params['id']);
      }
    )
  }

  addIngredient(){
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onDelete(){
    this.recipeService.delete(this.id);
    this.router.navigate(['recipes']);
  }

}
