import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
	selector: 'app-recipe-view',
	templateUrl: './recipe-view.component.html',
	styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
	
	@Input() recipe: Recipe;
	deleting: boolean = false;
	response: String = '';


	constructor(
		private recipeService: RecipeService,
		private route: ActivatedRoute,
		private router: Router		
	) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.recipe = this.recipeService.getRecipeObservable(id);
			

		});
	}

	editRecipe(): void {
		console.log('gonna edit this recipe please');
		let link = ['/detail', this.recipe._id];
		this.router.navigate(link);
	}

	deleteRecipe(): void {
		console.log('are you sure you want to do that?');
		this.deleting = false;

		this.recipeService.removeRecipe(this.recipe._id);			

		//go back to recipes page		
		this.router.navigate(['/recipes']);
	}



	goBack(): void {
		window.history.back();
	}

}
