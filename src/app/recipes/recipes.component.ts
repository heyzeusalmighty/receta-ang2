import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';
import { RecipeTag } from '../models/tag';
import { RecipesStoreModel } from '../models/recipeStoreModel';
import { AppState } from '../models/appstate';

@Component({
	selector: 'app-recipes',
	templateUrl: 'recipes.component.html',
	styleUrls: ['recipes.component.css']
})
export class RecipesComponent implements OnInit {

	recentRecipes: Recipe[];
	selectedRecipe: Recipe;
	recipeStore : Observable<any>;
	recipeModels : Observable<any[]>;
	tags: RecipeTag[];
	searchString : string;
	searchingFlag : boolean = false;

	$recipeModel: Observable<RecipesStoreModel>;
	$recipes: Observable<Recipe[]>;	
	//$recipes: 

  

	constructor(private router: Router, private recipeService: RecipeService) {
		this.$recipes = this.recipeService.getRecipesObservable();

	}

	ngOnInit() {
		this.getRecipes();
	}

	getRecipes(): void {
		this.recipeStore = this.recipeService.getRecipeStoreObservable();
		this.recipeStore.subscribe(
			data => { 
				this.recentRecipes = data.recipes;
				this.tags = data.tags;
		});

		if(!this.recipeService.madeRecipeCall) {
			this.recipeService.getRecipes();
		}

		if(!this.recipeService.madeTagCall) {
			this.recipeService.getTags();
		}
	}

	addNewRecipe(): void {		
		this.router.navigate(['/new']);
	}

	gotoRecipe(recipe: Recipe): void {
		let link = ['/view', recipe._id];
		this.router.navigate(link);
	}

	filterByTag(tag: RecipeTag): void {
		console.log(' filtering by ', tag.name);
	}

	search() : void {

	}



}
