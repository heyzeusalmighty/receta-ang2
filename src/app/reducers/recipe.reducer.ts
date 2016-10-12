
import { ActionReducer, Action } from '@ngrx/store';

import { Recipe } from '../models/recipe';
import { RecipeTag } from '../models/tag';
import { RecipesStoreModel } from '../models/recipeStoreModel';

import * as _ from 'lodash';

export const ADD_RECIPE: string = 'ADD_RECIPE';
export const UPDATE_RECIPE: string = 'UPDATE_RECIPE';
export const DELETE_RECIPE: string = 'DELETE_RECIPE';
// export const ADD_TAG: string = 'ADD_TAG';
// export const UPDATE_TAG: string = 'UPDATE_TAG';
// export const DELETE_TAG: string = 'DELETE_TAG';
export const GET_RECIPE = 'GET_RECIPE';

let initialState = new RecipesStoreModel();
// let dummyTag = new RecipeTag();
// dummyTag._id = 'whoa what is that';
// dummyTag.name = 'Desert';
// initialState.tags.push(dummyTag);


export const recipeReducer: ActionReducer<RecipesStoreModel> = (state = initialState, action: Action) => {
	switch (action.type) {
		case ADD_RECIPE:
			let x = state.recipes.concat(action.payload);
			return Object.assign({}, state, { recipes: x});

		case UPDATE_RECIPE:
			let index = _.findIndex(state.recipes, { _id: action.payload._id });
			if(index >= 0) {
				state.recipes = [
					...state.recipes.slice(0, index),
					action.payload,
					...state.recipes.slice(index + 1)
				];
			}
			return state;

		case DELETE_RECIPE:
			return state;		

		case GET_RECIPE:
			state.selectedRecipe = state.recipes.filter(rec => {
				return rec._id === action.payload._id;
			})[0];
			return state;

			

		default:
			return state;
	}
};

//export const tagReducer: ActionReducer
