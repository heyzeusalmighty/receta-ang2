import { Component, OnInit, Input, ContentChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MdInputModule } from '@angular2-material/input';
import { Recipe, Ingredient, Instruction } from '../models/recipe';
import { RecipeTag } from '../models/tag';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: 'recipe-detail.component.html',
  styleUrls: ['recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	@Input() recipe: Recipe;
	@ContentChildren(MdInputModule) inputs: QueryList<MdInputModule>;
	tags: RecipeTag[];
	recipeStore : Observable<any>;



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

					//this.recipe = this.recipeService.getRecipeObservable(id);
					this.recipeStore = this.recipeService.getRecipeStoreObservable();
					this.recipeStore.subscribe(
						data => {
							this.recipe = data.recipes.filter(recs => {
								return recs._id === id;
							})[0];

							this.tags = data.tags;
							this.tags.forEach((tag) => {
								this.recipe.tags.forEach(recTag => {
									if(recTag === tag.name) {
										tag.selected = true;
									}
								});
							});
						}
					);

					// this.recipeService.getRecipeObservable(id)
					// 	.subscribe(
					// 		recipe => {
					// 			this.recipe = recipe;
					// 			this.recipeStore = this.recipeService.getRecipeStoreObservable();
					// 			this.recipeStore.subscribe(
					// 				data => { 
					// 					this.tags = data.tags;
					// 					this.tags.forEach((tag) => {
					// 						recipe.tags.forEach((recTag) => {
					// 							if(recTag === tag.name) {
					// 								tag.selected = true;
					// 							}
					// 						})
					// 					})
					// 			});
					// 		},
					// 		err =>  console.log(err)
					// 	);
					
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

	toggleTag(tag : RecipeTag):void {
		if(tag.selected) {
			this.recipe.tags.forEach((recTag, idx) => {
				if(recTag == tag.name) {
					this.recipe.tags.splice(idx, 1);
					tag.selected = false;
				}
			})
		} else {
			this.recipe.tags.push(tag.name);
			tag.selected = true;
		}
		// console.log('tag ', tag)
		// tag.selected = !tag.selected;
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

	deleteIngredientGroup(index :number): void {
		this.recipe.ingredients.splice(index, 1);
	}



  custom(index,item){    
    return index;
  }

  goBack(): void {
    window.history.back();
  }

}
