
import { ActionReducer, Action } from '@ngrx/store';

import { RecipeTag } from '../models/tag';
import { RecipesStoreModel } from '../models/recipeStoreModel';

export const ADD_TAG: string = 'ADD_TAG';
export const UPDATE_TAG: string = 'UPDATE_TAG';
export const DELETE_TAG: string = 'DELETE_TAG';
export const RESET: string = 'RESET';


let initialState = new RecipesStoreModel();
let dummyTag = new RecipeTag();
dummyTag.id = 1;
dummyTag.name = "Desert";
initialState.tags.push(dummyTag);

export const tagReducer: ActionReducer<RecipesStoreModel> = (state = initialState, action: Action) => {
    switch (action.type) {
        case ADD_TAG:
            var x = state.tags.concat(action.payload);
            return Object.assign({}, state, { recipes: x});

        case UPDATE_TAG:
            return state;

        case DELETE_TAG:
            return state;

        case RESET:
            return state;

        default:
            return state;
    }
}
