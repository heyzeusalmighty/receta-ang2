import { Recipe } from './recipe';
import { RecipeTag } from './tag';

export class RecipesStoreModel {
    recipes: Array<Recipe> = [];
    tags: Array<RecipeTag> = [];
}