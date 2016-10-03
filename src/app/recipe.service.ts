import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Recipe } from './models/recipe';
import { RECIPES } from './models/mock-recipes';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ADD_RECIPE } from './reducers/recipe.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeService {

	private recipesUrl = 'http://localhost:3000/api/recipes';
	recipeStore: Observable<any>;
	recipes: Array<any>;
	madeTheCall: boolean = false;

	constructor (private http: Http, private store: Store<any>) {
		this.recipeStore = store.select('recipe');
		this.recipeStore.subscribe( data => this.recipes = data.recipes );
	}


	getRecipes() {
		this.madeTheCall = true;
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

	// getRecipes(): Promise<Recipe[]> {
	//   return Promise.resolve(RECIPES);
	// }

	// getRecipe(id: number): Promise<Recipe> {
	//   return this.getRecipes()
	//     //.then(recipes => recipes.find(rec => rec._id == id));
	//   .then(recipes => { return recipes[0]});
	// }


	// OBSERVABLE VERSIONS

	getRecipesObservable() : Observable<Recipe[]> {
		return this.http.get(this.recipesUrl)
			.map((res:Response) => res.json())      
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}


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



}
