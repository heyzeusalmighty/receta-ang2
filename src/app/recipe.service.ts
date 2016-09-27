import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Recipe } from './models/recipe';
import { RECIPES } from './models/mock-recipes';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RecipeService {

  constructor (private http: Http) {}
  private recipesUrl = 'http://localhost:3000/api/recipes';

  getRecipes(): Promise<Recipe[]> {
    return Promise.resolve(RECIPES);
  }

  getRecipe(id: number): Promise<Recipe> {
    return this.getRecipes()
      //.then(recipes => recipes.find(rec => rec._id == id));
	  .then(recipes => { return recipes[0]});
  }

  // editRecipe(recipe: Recipe): Promise<Recipe> {
  //   //return this.http.put(`/cat/${cat._id}`, JSON.stringify(cat), this.options);

  // }

  // OBSERVABLE VERSIONS

	getRecipesObservable() : Observable<Recipe[]> {
		return this.http.get(this.recipesUrl)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}


	getRecipeObservable(id: string): Observable<Recipe> {
		//return this.getRecipes().find(rec => rec.id === id);
		//console.log(' i am getting a single recipe => ', id);
		return this.http.get(`${this.recipesUrl}/${id}`)
						.map((res: Response) => res.json())
						.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	addRecipe (body: Object): Observable<Recipe[]> {
        let bodyString 	= JSON.stringify(body); // Stringify payload
        
		let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options		= new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.recipesUrl, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

	// Update a comment
    updateComment (body: Object): Observable<Recipe[]> {
        let bodyString 	= JSON.stringify(body); // Stringify payload
        let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options		= new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.recipesUrl}/${body['id']}`, body, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Delete a comment
    removeComment (id:string): Observable<Recipe[]> {
        return this.http.delete(`${this.recipesUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }      



}
