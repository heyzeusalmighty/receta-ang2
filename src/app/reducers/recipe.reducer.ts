
import { ActionReducer, Action } from '@ngrx/store';

import { Recipe } from '../models/recipe';

export const ADD_RECIPE: string = 'ADD_RECIPE';
export const UPDATE_RECIPE: string = 'UPDATE_RECIPE';
export const DELETE_RECIPE: string = 'DELETE_RECIPE';
export const RESET: string = 'RESET';

// const initialState = {
//     recipes: Recipe[];
// }

export class RecipesStoreModel {
    recipes: Array<Recipe> = [];
}

let initialState = new RecipesStoreModel();
var firstRecipe = new Recipe();
firstRecipe.name = "dumb old recipe";
initialState.recipes.push(firstRecipe);

export const recipeReducer: ActionReducer<RecipesStoreModel> = (state = initialState, action: Action) => {
    switch (action.type) {
        case ADD_RECIPE:
            return Object.assign({}, state, { recipes: action.payload});

        case UPDATE_RECIPE:
            return state;

        case DELETE_RECIPE:
            return state;

        case RESET:
            return state;

        default:
            return state;
    }
}