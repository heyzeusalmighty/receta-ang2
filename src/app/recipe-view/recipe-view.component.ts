import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { YummlyService } from '../services/yummly.service';

@Component({
	selector: 'app-recipe-view',
	templateUrl: './recipe-view.component.html',
	styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
	
	@Input() recipe: Recipe;
	deleting: boolean = false;
	response: String = '';
	showScrapeButton: boolean = false;


	constructor(
		private recipeService: RecipeService,
		private yummlyService: YummlyService,
		private route: ActivatedRoute,
		private router: Router		
	) { }

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.recipe = this.recipeService.getRecipeObservable(id);

			setTimeout(() => {
				if(this.recipe && this.recipe.yummlyId && this.recipe.yummlyId.length > 2 && this.recipe.instructions.length <= 1 ) {		
					//	console.log(this.recipe.instructions.length)			
					this.showScrapeButton = true;
				} else if (!this.recipe) {					
					// this is pretty hacky but basically if it can't find the 
					// recipe, go back to the main screen
					this.router.navigate(['/recipes']);
				}
			}, 200);		
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

		// go back to recipes page		
		this.router.navigate(['/recipes']);
	}

	scrapyScrapy(): void {
		console.log('now you are scraping');
		this.showScrapeButton = false;
	}



	goBack(): void {
		window.history.back();
	}

}
