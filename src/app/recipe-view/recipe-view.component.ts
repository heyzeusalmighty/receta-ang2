import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-view',
	templateUrl: './recipe-view.component.html',
	styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
	@Input() recipe: Recipe;
	constructor(
		private recipeService: RecipeService,
		private route: ActivatedRoute,
		private router: Router		
	) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.recipeService.getRecipeObservable(id)
				.subscribe(recipe => this.recipe = recipe,
				err => console.log(err)
			);
		});
	}

	editRecipe(): void {
		console.log('gonna edit this recipe please');
		let link = ['/detail', this.recipe._id];
    	this.router.navigate(link);
	}

	deleteRecipe(): void {
		console.log('are you sure you want to do that?');
	}


	goBack(): void {
		window.history.back();
	}

}
