import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { RecipeDataService } from './recipe-data.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class RecipeEffectsService {

	private recipesUrl 	= 'http://localhost:3000/api/recipes';
	private tagsUrl 	= 'http://localhost:3000/api/tags';
	private yumUrl 		= 'http://localhost:3000/api/yummly';
	private headers		= new Headers({ 'Content-Type': 'application/json' });
	private options		= new RequestOptions({ headers: this.headers });

	constructor(private http: Http, private actions$: Actions) {}

	@Effect() addRecipe$ = this.actions$
		.ofType('ADD_RECIPE')
		.map(action => JSON.stringify(action.payload))
		.switchMap(payload => this.http.post(this.recipesUrl, payload, this.options)
			.map(res =>  ({ type: 'ADD_RECIPE_SUCCESS', payload: res.json() }))			
			.catch(() => Observable.of({ type: 'ADD_RECIPE_FAILED'}))			
		);
	
	@Effect() loadRecipes$ = this.actions$
		.ofType('LOAD_RECIPES')
		.map(action => JSON.stringify(action.payload))
		.switchMap(payload => this.http.get(this.recipesUrl))
			.map( res => ({ type: 'LOAD_RECIPES_SUCCESS', payload: res.json() }))
			.catch(() => Observable.of({ type: 'LOAD_RECIPES_FAILED'})
		);

	@Effect() loadTags$ = this.actions$
		.ofType('LOAD_TAGS')
		.map(action => JSON.stringify(action.payload))
		.switchMap(payload => this.http.get(this.tagsUrl))
			.map( res => ({ type: 'LOAD_TAGS_SUCCESS', payload: res.json() }))
			.catch(() => Observable.of({ type: 'LOAD_RECIPES_FAILED'})
		);

	
	@Effect() deleteRecipe$ = this.actions$
		.ofType('DELETE_RECIPE')
		//.map(action => JSON.stringify(action.payload))
		.switchMap(id => this.http.delete(`${this.recipesUrl}/${id.payload}`))
			.map( res => ({ type: 'DELETE_RECIPE_SUCCESS', payload: res}))			
			.catch((err) => Observable.of({type: 'DELETE_RECIPE_FAILED'}) 
		);

	@Effect() getRecipeInstructions = this.actions$
		.ofType('GET_INSTRUCTIONS')
		.switchMap(action => this.http.post(`${this.yumUrl}/${action.payload}`, {}))
			.map(res => ({ type: 'GET_INSTRUCTIONS_SUCCESS', payload: res}))
			.catch((err) => Observable.of({type: 'GET_INSTRUCTIONS_FAILED'}));

}


// removeRecipe (id : string) : Observable<String> {
// 		return this.http.delete(`${this.recipesUrl}/${id}`)
// 			.map((res: Response) => res.json()) 
// 			.catch((error: any) => Observable.throw(error || 'Server error')); 
// 	}
