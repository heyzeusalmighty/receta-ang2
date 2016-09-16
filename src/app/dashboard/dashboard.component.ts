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
    this.recipeService.getRecipes().then(recipes => this.recipes = recipes.slice(1, 5));
  }

  gotoRecipe(recipe: Recipe): void {
    let link = ['/detail', recipe.id];
    this.router.navigate(link);

  }

}
