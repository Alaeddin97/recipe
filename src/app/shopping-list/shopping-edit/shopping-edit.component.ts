import { Component, OnInit,OnDestroy,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  @ViewChild('f',{static:true}) form:NgForm;
  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.shoppingService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.onEditItem(this.editedItemIndex);
      }
    )
  }

  onAddItem(form:NgForm){
    const value=form.value;
    if(this.editMode){
      this.shoppingService.editIngredient(this.editedItemIndex,new Ingredient(value.name,value.amount));
    }else{

      this.shoppingService.addIngredient(new Ingredient(value.name,value.amount));
    }
    form.reset();
  }

  onEditItem(index:number){
    const editedItem=this.shoppingService.getIngredient(index);
    this.form.value.name=editedItem.name;
    this.form.value.amount=editedItem.amount;
    
  }

  onClear(){
    this.form.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
