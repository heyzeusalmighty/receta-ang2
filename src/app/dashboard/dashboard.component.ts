import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe';
import { RecipesStoreModel } from '../models/recipeStoreModel';
import { INCREMENT, DECREMENT, RESET } from '../reducers/counter';
import { ADD_RECIPE } from '../reducers/recipe.reducer';


interface AppState {
  counter: number;
  recipes: RecipesStoreModel;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recipes: Recipe[] = [];
  counter: Observable<any>;
  recipeStore : Observable<any>;
  recipeModels : Observable<any[]>;

  constructor(
    private router: Router, 
    private recipeService: RecipeService, 
    public store: Store<AppState>) { 
        this.counter = this.store.select('counter');
      // this.recipeModels = this.store.select('recipes');
    }

  ngOnInit() {
    // this is from before ngrx stores
    //this.recipeService.getRecipes().then(recipes => this.recipes = recipes.slice(1, 5));
    // this.recipeService.getRecipesObservable()
    //     .subscribe(recipes => this.recipes = recipes,
    //     err => { console.log(err); });

    this.recipeStore = this.recipeService.getRecipeStoreObservable();
    this.recipeStore.subscribe(
      data => this.recipes = data.recipes
    );


    if(!this.recipeService.madeRecipeCall) {
			this.recipeService.getRecipes();
		}

		if(!this.recipeService.madeTagCall) {
			this.recipeService.getTags();
		}
  }

  gotoRecipe(recipe: Recipe): void {
    let link = ['/view', recipe._id];
    this.router.navigate(link);
  }

  addNewRecipe() :void {
    this.router.navigate(['/new']);
  }

  // reducer stuff
  increment() :void {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() : void {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() : void {
    this.store.dispatch({ type: RESET });
  }

  addStupidRecipe() : void {
    //this.store
    console.log('adding stupid')
    //this.recipeStore.dispatch({ type: ADD_RECIPE, payload: { name: 'DUMB', description: 'THOMAS'}})
  }

}
