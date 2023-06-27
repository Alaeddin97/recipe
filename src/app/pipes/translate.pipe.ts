import { PipeTransform,Pipe } from "@angular/core";

@Pipe({
    name:'translate'
})
export class TranslatePipe implements PipeTransform{
    transform(value: string) {
        const dictinary={
            Recipes:"recettes",
            Manage:"manager"
            };

            return dictinary[value];

    }

}