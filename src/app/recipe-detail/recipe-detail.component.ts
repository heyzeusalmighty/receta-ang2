import { Component, OnInit, Input, ContentChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MdInputModule } from '@angular2-material/input';
import { Recipe, Ingredient, Instruction } from '../models/recipe';
import { RecipeTag } from '../models/tag';
import { RecipeService } from '../services/recipe.service';


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
	tagStore: Observable<any>;



	constructor(
		private recipeService: RecipeService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		
		//first lets get some tags
		this.tagStore = this.recipeService.getTagStoreObservable();
		this.tagStore.subscribe(data => this.tags = data.tags);

		// sometimes this gets persisted, turn them all off by default
		this.tags.forEach(tag => tag.selected = false);
		
		let urlPath = this.route.snapshot.url[0].path;
		if(urlPath === 'new') {
			this.recipe = new Recipe();			
		} else {
			this.route.params.forEach((params: Params) => {
				let id = params['id'];
				if(id.length > 0) {

					this.recipeStore = this.recipeService.getRecipeStoreObservable();
					this.recipeStore.subscribe(
						data => {
							this.recipe = data.recipes.filter(recs => {
								return recs._id === id;
							})[0];							
						}
					);

					this.tags.forEach((tag) => {
						tag.selected = (this.recipe.tags.indexOf(tag.name) > -1);
					});
				}
			});
		}	
	}


	addIngredient(): void {
		let newGroup = new Ingredient();
		this.recipe.ingredients.push(newGroup);
	}

	addIngredientToGroup(): void {

	}

	deleteIngredient(index): void {
		this.recipe.ingredients.splice(index, 1);
	}

	addInstruction(): void {
		let newId = this.recipe.instructions.length + 1;
		this.recipe.instructions.push(new Instruction(newId));    
	}

	deleteInstruction(index): void {
		this.recipe.instructions.splice(index, 1);
	}

	toggleTag(tag : RecipeTag): void {
		if(tag.selected) {
			this.recipe.tags.forEach((recTag, idx) => {
				if(recTag === tag.name) {
					this.recipe.tags.splice(idx, 1);
					tag.selected = false;
				}
			});
		} else {
			this.recipe.tags.push(tag.name);
			tag.selected = true;
		}		
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

		this.validate();
		this.recipeService.addRecipeToStore(this.recipe);
		
		if(this.recipe._id) {
			window.history.back();
		} else {
			console.log('ain\'t got no history');
			window.history.back();
		}			
	}

	deleteIngredientGroup(index :number): void {
		this.recipe.ingredients.splice(index, 1);
	}

	validate() : void {
		if (this.recipe.yummlyId === null || this.recipe.yummlyId === undefined) {
			this.recipe.yummlyId = '';
		}

		if (this.recipe.source === null || this.recipe.source === undefined) {
			this.recipe.source = '';
		}

		if (this.recipe.sourceUrl === null || this.recipe.sourceUrl === undefined) {
			this.recipe.sourceUrl = '';
		}
	}



	custom(index, item) {    
		return index;
	}

	goBack(): void {
		window.history.back();
	}

}
