import { RecipesStoreModel } from './recipeStoreModel';
import { TagStoreModel } from './tagStoreModel';


export interface AppState {
  counter: number;
  recipes: RecipesStoreModel;
  tags: TagStoreModel;
}