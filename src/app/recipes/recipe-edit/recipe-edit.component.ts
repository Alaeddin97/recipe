import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../Recipe.service";
import { canComponentDeactivate } from "./canDeactivate.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDes = "";
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDes = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDes, Validators.required),
      'ingredients': recipeIngredients,
    });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  // canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
  //   return confirm("You want to exist right now?");
  // }

  onAddIng() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(
        this.id,
        new Recipe(
          this.recipeForm.value['name'],
          this.recipeForm.value['description'],
          this.recipeForm.value['imagePath'],
          this.recipeForm.value['ingredients']
        )
      );
    }else{
      this.recipeService.addRecipe(new Recipe(
        this.recipeForm.value['name'],
          this.recipeForm.value['description'],
          this.recipeForm.value['imagePath'],
          this.recipeForm.value['ingredients']
      ))
    }
    this.onQuit();
  }

  onQuit(){
    this.router.navigate(['../'],{relativeTo:this.route});

  }
  onDelete(index:number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }
}
