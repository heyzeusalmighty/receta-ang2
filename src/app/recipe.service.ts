import { Injectable } from '@angular/core';

import { Recipe } from './models/recipe';
import { RECIPES } from './models/mock-recipes';

@Injectable()
export class RecipeService {

  getRecipes(): Promise<Recipe[]> {
    return Promise.resolve(RECIPES);
  }

  getRecipe(id: number): Promise<Recipe> {
    return this.getRecipes()
      .then(recipes => recipes.find(rec => rec.id === id));
  }

}
