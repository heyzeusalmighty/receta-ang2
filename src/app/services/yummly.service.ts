import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipesStoreModel } from '../models/recipeStoreModel';
import { ADD_RECIPE } from '../reducers/recipe.reducer';




@Injectable()
export class YummlyService {

	private yummlyUrl = 'http://localhost:3000/api/yummly';
	

	constructor(private http: Http, private store: Store<RecipesStoreModel>) { }

	searchYummly(searchTerm : string, pageNumber : number) {

		let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options		= new RequestOptions({ headers: headers }); // Create a request option

		let searchUrl = this.yummlyUrl + '/' + searchTerm + '/' + pageNumber;

		//return Observable.of(this.dummyResponse).map(o => JSON.stringify(o));

		return this.http.get(searchUrl, options )
			.map((res: Response) => res.json());

	}

	getRecipe(id : string) {
		let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options		= new RequestOptions({ headers: headers }); // Create a request option

		let searchUrl = this.yummlyUrl + '/' + id;

		return this.http.get(searchUrl, options)
			.map((res: Response) => res.json());
	}

	addRecipeToCollection(id : string) {

		console.info('id from yumm ', id);
		let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options		= new RequestOptions({ headers: headers }); // Create a request option

		let savingUrl = this.yummlyUrl + '/' + id;

		return this.http.post(savingUrl, options)
			.map((res: Response) =>  {
				this.store.dispatch({ type: ADD_RECIPE, payload: res.json()});
				return res.json();
			});
	}




















}
