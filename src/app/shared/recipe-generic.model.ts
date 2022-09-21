import { Ingredient } from "./ingredient.model";

export class recipeGeneric{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];
    public id:string;

    constructor(name:string,desc:string,imagePath:string,ings:Ingredient[],id:string){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingredients=ings;
        this.id=id;
    }

}