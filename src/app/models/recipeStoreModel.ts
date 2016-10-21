import { Recipe } from './recipe';
import { RecipeTag } from './tag';

export class RecipesStoreModel {
	recipes: Array<Recipe> = [];
	fullSetRecipes: Array<Recipe> = [];
	tags: Array<RecipeTag> = [];
	selectedRecipe: Recipe;
	filterCriteria: string;
	filterTags: Array<string>;

	constructor() {
		this.recipes = [];
		this.fullSetRecipes = [];
		this.tags = [];
		this.filterCriteria = '';
		this.filterTags = [];
	}
};
