import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    //this.recipeService.getRecipes().then(recipes => this.recipes = recipes.slice(1, 5));
    this.recipeService.getRecipesObservable()
        .subscribe(recipes => this.recipes = recipes,
        err => { console.log(err); });
  }

  gotoRecipe(recipe: Recipe): void {
    console.log('recipe', recipe._id)
    let link = ['/detail', recipe._id];
    this.router.navigate(link);

  }

}
