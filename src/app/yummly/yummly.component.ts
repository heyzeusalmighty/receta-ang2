import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { YummlyService } from '../services/yummly.service';
import { Recipe, Ingredient, Instruction } from '../models/recipe';

@Component({
	selector: 'app-yummly',
	templateUrl: './yummly.component.html',
	styleUrls: ['./yummly.component.css']
})
export class YummlyComponent implements OnInit {

	searchTerm: string = 'cinnamon';
	pageNumber: number = 0;
	searchResults: Observable<any>;
	recipeSelected: boolean = false;
	selectedRecipe;
	selectedRecipeExpand : boolean = false;

	constructor(private yumService : YummlyService) { }

	ngOnInit() {

	}




	checkingForEnter(event, index): void {
		//keycode of the enter key is 13 btw
		if(event.keyCode === 13) {
			console.log('enter');
			this.searchYummly();
		}
	}

	searchYummly() : void {
		this.yumService.searchYummly(this.searchTerm, this.pageNumber)
			.subscribe(
				data => this.searchResults = data
			);
	}

	getYumRecipe(rec) {
		console.log(rec.id);
		this.selectedRecipeExpand = false;
		this.yumService.getRecipe(rec.id)
			.subscribe(
				(data) => {
					this.recipeSelected = true;
					this.selectedRecipe = data;
			});
		
	}

	addYumRecipeToCollection() : void {
		let converted = this.convertSelectedToRecipe();
		this.yumService.addRecipeToCollection(converted);
	}


	convertSelectedToRecipe() : Recipe {
		let rec = new Recipe();

		rec.recipeName = this.selectedRecipe.name;
		rec.description = 'pulled from Yummly';
		rec.servingSize = this.selectedRecipe.numberOfServings;
		rec.yummlyId = this.selectedRecipe.id;
		rec.imageUrl = this.selectedRecipe.images[0].hostedLargeUrl;
		rec.instructions = [new Instruction(1)];
		rec.ingredients = [new Ingredient('From Yummly', this.selectedRecipe.ingredientLines)];
		rec.source = this.selectedRecipe.source.sourceDisplayName;
		rec.sourceUrl = this.selectedRecipe.source.sourceRecipeUrl;

		return rec;
	}

}
