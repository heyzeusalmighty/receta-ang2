import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: 'recipes.component.html',
  styleUrls: ['recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recentRecipes: Recipe[];
  selectedRecipe: Recipe;

  constructor(private router: Router, private recipeService: RecipeService) { }

	ngOnInit() {
		this.getRecipes();
	}

	getRecipes(): void {
	//this.recipeService.getRecipes().then(recipes => this.recentRecipes = recipes);
		this.recipeService.getRecipesObservable()
			.subscribe(
				recipes => this.recentRecipes = recipes,
				err =>  console.log(err)
		);
	}

	addNewRecipe(): void {
		console.log('lets add a recipe');
		let link = ['/new', ''];
		this.router.navigate(link);
	}

	gotoRecipe(recipe: Recipe): void {
		let link = ['/view', recipe._id];
		this.router.navigate(link);
	}



}
