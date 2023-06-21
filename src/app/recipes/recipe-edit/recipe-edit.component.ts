import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params,Router } from '@angular/router'
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe-list/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode: boolean;
  id: number;
  recipeForm:FormGroup;
  recipe:Recipe;

  constructor(private route: ActivatedRoute,
              private router:Router,
              private recipeService:RecipeService) { }

  ngOnInit(): void {
       
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
      }
    )

    this.recipe=this.recipeService.getRecipe(this.id);
    
    if(this.editMode){
      const arr=new FormArray([]);
      this.recipe.ingredients.forEach(element => {
        arr.push(new FormGroup(
          {
            'name':new FormControl(element.name),
            'amount':new FormControl(element.amount)}
          ));
      });
      this.recipeForm=new FormGroup({
        'name': new FormControl(this.recipe.name, [Validators.required]),
        'description': new FormControl(this.recipe.description, [Validators.required]),
        'imagePath':new FormControl(this.recipe.imagePath,[Validators.required]),
        'ingredients':arr
      });
    }else{
      this.recipeForm=new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'imagePath':new FormControl('',[Validators.required]),
        'ingredients':new FormArray([])
      });
    }

  }

  onAddIngredient(){
      const controlGroup=new FormGroup({
        'name':new FormControl(null),
        'amount':new FormControl(null)
      });
      (<FormArray>this.recipeForm.get('ingredients')).push(controlGroup);
  }


  onSave(){
    const value=this.recipeForm.value;
    const recipe=new Recipe(value.name,value.description,value.imagePath,value.ingredients);
    if(!this.editMode){
      this.recipeService.addRecipe(recipe);
    }else{
      this.recipeService.editRecipe(recipe,this.id);
    }
    this.router.navigate(['recipes']);
    
  }

  onDeleteIng(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel(){
    this.router.navigate(['recipes']);
  }

  onClear(){
    this.recipeForm.reset();
  }


}
