import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './Shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ngChangedSub:Subscription;
  ingredients:Ingredient[];
  constructor(private shoppingListService:ShoppingListService) { 
    this.ngChangedSub=this.shoppingListService.ingredientsChanged.subscribe(
      (ings:Ingredient[])=>{
        this.ingredients=ings;
      }
    )
  }

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();
  }
  ngOnDestroy(): void {
    this.ngChangedSub.unsubscribe();
  }
  loadIngredient:Ingredient=null;
  editItem(index:number){
    this.shoppingListService.startingEdit.next(index);
  }
  

}
