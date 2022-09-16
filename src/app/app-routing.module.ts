import { NgModule } from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import { AuthGuard } from './Auth-guard.service'
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component'
import { canDeactivateGuard } from './recipes/recipe-edit/canDeactivate.service'
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'
import { RecipesComponent } from './recipes/recipes.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'
import { StartRecipeComponent } from './start-recipe/start-recipe.component'
const appRoutes:Routes=[
{path:'',redirectTo:'/recipes',pathMatch:'full'},
{path:'recipes',component:RecipesComponent,
children:[
    {path:'',component:StartRecipeComponent},
    {path:'new',component:RecipeEditComponent,canActivate:[AuthGuard]},
    // {path:'new',component:RecipeEditComponent,canActivate:[AuthGuard],canDeactivate:[canDeactivateGuard]},
    {path:':id',component:RecipeDetailComponent},
    {path:':id/edit',component:RecipeEditComponent}
    // {path:':id/edit',component:RecipeEditComponent,canDeactivate:[canDeactivateGuard]}
  ]},
{path:'shopping-list',component:ShoppingListComponent}
]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRounting{

}