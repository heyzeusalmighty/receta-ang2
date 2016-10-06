import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Recipe } from './models/recipe';
import { RECIPES } from './models/mock-recipes';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ADD_RECIPE, ADD_TAG } from './reducers/recipe.reducer';
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
	madeRecipeCall: boolean = false;
	madeTagCall: boolean = false;

	constructor (private http: Http, private store: Store<any>) {
		this.recipeStore = store.select('recipe');
		this.recipeStore.subscribe( data => this.recipes = data.recipes );		
	}


	getRecipes() {
		this.madeRecipeCall = true;
		return this.http.get(this.recipesUrl)
			.map((res:Response) => res.json())
			.subscribe( 
				data => this.store.dispatch({ type: ADD_RECIPE, payload: data}),
				error => console.log('errror ' + error)
			)
	}

	getRecipeStoreObservable() {
		return this.recipeStore;
	}

	getTags() {
		this.madeTagCall = true;
		return this.http.get(this.tagsUrl)
			.map((res: Response) => res.json())
			.subscribe(
				data => this.store.dispatch({ type: ADD_TAG, payload: data}),
				error => console.log('err => ', error)
			)
	}

	// OBSERVABLE VERSIONS

	// getRecipesObservable() : Observable<Recipe[]> {
	// 	return this.http.get(this.recipesUrl)
	// 		.map((res:Response) => res.json())      
	// 		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	// }

	// getRecipeObservable(id: string) {

	// }

	getRecipeObservable(id: string): Observable<Recipe> {		
		return this.http.get(`${this.recipesUrl}/${id}`)
						.map((res: Response) => res.json())
						.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	addRecipe (body: Object): Observable<Recipe[]> {
				let bodyString 	= JSON.stringify(body); // Stringify payload        
				let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
				let options		= new RequestOptions({ headers: headers }); // Create a request option

				return this.http.post(this.recipesUrl, body, options) // ...using post request
												 .map((res:Response) => res) // ...and calling .json() on the response to return data
												 .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
	}

	addRecipeToStore(body: Object) {
		let bodyString 	= JSON.stringify(body); // Stringify payload        
		let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options		= new RequestOptions({ headers: headers }); // Create a request option

		return this.http.post(this.recipesUrl, body, options) // ...using post request
				.map((res:Response) => res)
				.subscribe( 
					data => this.store.dispatch({ type: ADD_RECIPE, payload: data}),
					error => console.log('errror ' + error)
				)
	}
	
	// Delete a comment
	removeRecipe (id:string): Observable<String> {
			return this.http.delete(`${this.recipesUrl}/${id}`)
												.map((res:Response) => res.json()) 
												.catch((error:any) => Observable.throw(error || 'Server error')); 
	}

	addTag(tagName: string) {
		let bodyString = JSON.stringify({ name: tagName });
		let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options		= new RequestOptions({ headers: headers }); // Create a request option


		return this.http.post(this.tagsUrl, bodyString, options )
				.map((res:Response) => res.json())
				.subscribe(
					data => this.store.dispatch({ type: ADD_TAG, payload: data}),
					error => console.error('error :: ', error)
				)
	}      



}
