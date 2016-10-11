import { Recipe } from './recipe';
import { RecipeTag } from './tag';

export class RecipesStoreModel {
	recipes: Array<Recipe> = [];
	filteredRecipes: Array<Recipe> = [];
	tags: Array<RecipeTag> = [];
	selectedRecipe: Recipe;
};
