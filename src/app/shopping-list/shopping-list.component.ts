import { Component, OnInit,OnDestroy} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[] = [];
  igChanged:Subscription;
  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingService.getIngredients();
    this.igChanged=this.shoppingService.ingredientChanged
      .subscribe(
        (ingredients:Ingredient[])=>{
          this.ingredients=ingredients;
        }
      )
  }

  onEditItem(index:number){
    this.shoppingService.startedEditing.next(index);
  }



  ngOnDestroy(): void {
    this.igChanged.unsubscribe();
  }


}
