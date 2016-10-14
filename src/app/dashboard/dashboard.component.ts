import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';


@Component({
	selector: 'app-dashboard',
	templateUrl: 'dashboard.component.html',
	styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	recipes: Recipe[] = [];
	recipeStore : Observable<any>;
	recipeModels : Observable<any[]>;

	constructor(private router: Router,	private recipeService: RecipeService) {	}

	ngOnInit() {
		this.recipeStore = this.recipeService.getRecipeStoreObservable();
		this.recipeStore.subscribe(
			data => this.recipes = data.recipes
		);
	}

	gotoRecipe(recipe: Recipe): void {
		let link = ['/view', recipe._id];
		this.router.navigate(link);
	}

	addNewRecipe() :void {
		this.router.navigate(['/new']);
	}

	addStupidRecipe() : void {
		console.log('adding stupid');
	}

}
