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
		console.log('params : ', this.route.params);
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			if(id.length > 0) { 
				this.recipeService.getRecipeObservable(id)
					.subscribe(
						recipe => this.recipe = recipe,
						err =>  console.log(err)
					);
			}
		});

		// this is a new recipe
		if(this.recipe === undefined) {
			console.log('recipe is not defined');
			this.recipe = new Recipe();
			this.recipe.ingredients = [];
			this.recipe.instructions = [];
			this.recipe.tags = [];
		} 
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
			this.addInstruction();
			console.log('inputs', this.inputs);
		}
	}

	updateRecipe(): void {
		console.log('saving');
		this.recipeService.addRecipe(this.recipe)
			.subscribe(
				updatedRecipe => { 
					console.log('done ');
					window.history.back();
				},
				err => console.log(err)
			);		
	}




  custom(index,item){    
    return index;
  }

  goBack(): void {
    window.history.back();
  }

}
