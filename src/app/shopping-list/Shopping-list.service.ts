import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    startingEdit=new Subject<number>();
    private ingredients:Ingredient[]=[
    ];
    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);   
    }
    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients);
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    EditIngredient(index:number,ingredient:Ingredient){
        this.ingredients[index]=ingredient;
        this.ingredientsChanged.next(this.ingredients);
    }
    deleteIngredient(editingItmeIndex: number) {
      this.ingredients.splice(editingItmeIndex, 1);
      this.ingredientsChanged.next(this.ingredients);

       }
    
}