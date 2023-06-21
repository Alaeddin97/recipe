import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';


export class RecipeService {

  private recipes:Recipe[]=[
    new Recipe('PIZZA','The finest PIZZA ever','https://menu-vegetarien.com/storage/2021/04/15-recettes-pizza-vegetariennes.jpg',
    [new Ingredient('Meat',2),new Ingredient('Pasta',1)]),
    new Recipe('Lasagna','The finest Lasagna ever','https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f.jpg',
    [new Ingredient('Meat',2),new Ingredient('Pasta',2)]),
    new Recipe('Tacos','The finest Tacos ever','https://img.cuisineaz.com/1024x576/2019/04/17/i146583-tacos-poulet-curry.jpeg',
    [new Ingredient('Meat',2),new Ingredient('Potatoes',2)]),
    new Recipe('Spaghetti','The finest Spaghetti ever','https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg',
    [new Ingredient('Spaghetti',1),new Ingredient('Meat',2),new Ingredient('Tomatoes',1)]),
    new Recipe('Hamburger','The finest Hamburger ever','https://i.f1g.fr/media/eidos/1200x630_crop/2021/10/13/XVM8f905250-2b38-11ec-9370-7e9ee94f28c7.jpg',
    [new Ingredient('Steak',1),new Ingredient('Chease',2),new Ingredient('Lettuce',1),new Ingredient('Bread',2)])
  ];

   recipesChanged=new Subject<Recipe[]>();


  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(id:number){
    return this.recipes.slice()[id];
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  editRecipe(recipe:Recipe,index:number){
    this.recipes[index]=recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  delete(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
