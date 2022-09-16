import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../Shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("form") form: NgForm;
  subscription: Subscription;
  editingItmeIndex: number;
  toEditItem: Ingredient;
  editMode = false;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startingEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editingItmeIndex = index;
        this.toEditItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.toEditItem.name,
          amount: this.toEditItem.amount,
        });
      }
    );
  }

  onSubmit(shoppingForm: NgForm) {
    // console.log(shoppingForm);
    const ingName = shoppingForm.value.name;
    const ingAmount = shoppingForm.value.amount;
    if (this.editMode) {
      this.shoppingListService.EditIngredient(
        this.editingItmeIndex,
        new Ingredient(ingName, ingAmount)
      );
    } else {
      this.shoppingListService.addIngredient(
        new Ingredient(ingName, ingAmount)
      );
    }
    this.editMode=false;
    shoppingForm.reset();
  }
  onDelete(shoppingForm:NgForm) {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(
        this.editingItmeIndex
      ); }  
      this.editMode=false;
      shoppingForm.reset();     
  }
  onClear(shoppingForm: NgForm) {
    this.editMode=false;
    shoppingForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
