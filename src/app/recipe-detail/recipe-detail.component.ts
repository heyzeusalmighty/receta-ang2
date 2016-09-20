import { Component, OnInit, Input, ContentChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { MdInputModule } from '@angular2-material/input';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: 'recipe-detail.component.html',
  styleUrls: ['recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  @ContentChildren(MdInputModule) inputs: QueryList<MdInputModule>;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.recipeService.getRecipe(id)
        .then(recipe => this.recipe = recipe);
    })
  }


  addIngredient(): void {
    this.recipe.ingredients.push("1 tsp of marjoram");
  }

  deleteIngredient(index): void {
    this.recipe.ingredients.splice(index, 1);
  }

  addInstruction(): void {
    this.recipe.instructions.push("");    
  }

  deleteInstruction(index):void {
    this.recipe.instructions.splice(index, 1);
  }

  checkingForEnter(event, index): void {
    //keycode of the enter key is 13 btw
    if(event.keyCode === 13) {
      console.log('this is it!!! => ', index);
      this.addInstruction();
      console.log('inputs', this.inputs);
      //this.recipe.instructions
    }
  }




  custom(index,item){    
    return index;
  }

  goBack(): void {
    window.history.back();
  }

}
