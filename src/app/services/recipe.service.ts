import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Recipe } from '../models/recipe';
import { RecipesStoreModel } from '../models/recipeStoreModel';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ADD_RECIPE, LOAD_RECIPES, DELETE_RECIPE, UPDATE_FILTER, REMOVE_FILTER } from '../reducers/recipe.reducer';
import { ADD_TAG, LOAD_TAGS } from '../reducers/tag.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeService {

	private recipesUrl = 'http://localhost:3000/api/recipes';
	private tagsUrl = 'http://localhost:3000/api/tags';
	recipeStore: Observable<any>;
	tagStore: Observable<any>;
	recipes: Array<any>;
	tags: Array<any>;
	selectedRecipe: Recipe;

	constructor (private http: Http, private store: Store<RecipesStoreModel>) {
		this.recipeStore = store.select('recipe');
		this.recipeStore.subscribe(data => this.recipes = data.recipes);

		this.tagStore = store.select('tag');

		this.getRecipes();
		this.getTags();
	}


	getRecipes() {
		this.store.dispatch({ type: LOAD_RECIPES});		
	}

	getRecipeStoreObservable() : Observable<any> {
		return this.recipeStore;
	}

	getTagStoreObservable() {
		return this.tagStore;
	}

	getTags() {
		this.store.dispatch({ type: LOAD_TAGS});		
	}

	getRecipeObservable(id: string) {		
		console.log('oh hi, getting recipe');
		return this.recipes.filter(recs => {
				return recs._id === id;
		})[0];
	}

	// add recipe to store
	addRecipeToStore(body: Object) { 
		this.store.dispatch({ type: ADD_RECIPE, payload: body});		
	}
	
	// Delete a recipe
	removeRecipe (id : string) : void {
		this.store.dispatch({ type: DELETE_RECIPE, payload: id}); 
	}

	addTag(tagName: string) {
		let bodyString = JSON.stringify({ name: tagName });
		let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options		= new RequestOptions({ headers: headers }); // Create a request option


		return this.http.post(this.tagsUrl, bodyString, options )
			.map((res: Response) => res.json())
			.subscribe(
				data => this.store.dispatch({ type: ADD_TAG, payload: data}),
				error => console.error('error :: ', error)
			);
	}      

	updateFilter(searchString: string) {

		console.log('from service I got => ', searchString, ' :: length ', searchString.length);

		(searchString.length === 0) 
			? this.store.dispatch({ type: REMOVE_FILTER, payload: searchString }) 
			: this.store.dispatch({ type: UPDATE_FILTER, payload: searchString });
	}



}
