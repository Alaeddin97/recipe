import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { StartComponent } from "./recipes/start/start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { recipesResolverService } from "./services/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";

const appRoute:Routes=[
    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {path:'recipes',component:RecipesComponent,children:[
        {path:'',component:StartComponent},

        {path:'new',component:RecipeEditComponent},

        {path:':id',component:RecipeDetailComponent,resolve:[recipesResolverService]},

        {path:':id/edit',component:RecipeEditComponent,resolve:[recipesResolverService]}
    ]},
    {path:'shopping-list',component:ShoppingListComponent},

    {path:'auth',component:AuthComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoute)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{

}