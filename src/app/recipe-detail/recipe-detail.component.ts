import { Component, OnInit, Input, ContentChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { MdInputModule } from '@angular2-material/input';
import { Recipe, Ingredient, Instruction } from '../models/recipe';
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
		let urlPath = this.route.snapshot.url[0].path;
		
		if(urlPath !== 'new') {
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
		} else {
			//this is a new recipe clearly
			this.recipe = new Recipe();
			this.recipe.ingredients = [];
			this.recipe.instructions = [];
			this.recipe.tags = [];
		}


		
  	}


	addIngredient(): void {
		var newGroup = new Ingredient();
		console.info(' adding new ingreidnets		')
		//newGroup.title = "";
		//newGroup.ingredients = [];
		console.info(' before => ', this.recipe.ingredients)
		this.recipe.ingredients.push(newGroup);
		console.info(' after  => ', this.recipe.ingredients)
	}

	addIngredientToGroup() :void {

	}

	deleteIngredient(index): void {
		this.recipe.ingredients.splice(index, 1);
	}

	addInstruction(): void {
		let newId = this.recipe.instructions.length + 1;
		this.recipe.instructions.push(new Instruction(newId));    
	}

	deleteInstruction(index):void {
		this.recipe.instructions.splice(index, 1);
	}

	checkingForEnter(event, index): void {
		//keycode of the enter key is 13 btw
		if(event.keyCode === 13) {
			this.addInstruction();
			// if(this.recipe.instructions[this.recipe.instructions.length - 1].length !== 0) {
			// 	this.addInstruction();
			// } else {
			// 	console.log('empty string at the end');
			// }
			// this.addInstruction();
			// console.log('inputs', this.inputs);
		}
	}

	updateRecipe(): void {
		console.log('saving');
		let response = this.recipeService.addRecipeToStore(this.recipe);
		console.info('response => ', response)

		if(this.recipe._id) {
			window.history.back();
		} else {
			console.log("ain't got no history");
			window.history.back();
		}
			// .subscribe(
			// 	updatedRecipe => { 
			// 		console.log('done ', updatedRecipe);
			// 		if(this.recipe._id) {
			// 			window.history.back();
			// 		} else {
			// 			console.log("don't got no history");
			// 		}
			// 	},
			// 	err => console.log(err),
			// 	() => { console.log('we have finished here') }
			// );		
	}




  custom(index,item){    
    return index;
  }

  goBack(): void {
    window.history.back();
  }

}
