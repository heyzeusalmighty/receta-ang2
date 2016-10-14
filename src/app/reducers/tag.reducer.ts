
import { ActionReducer, Action } from '@ngrx/store';

import { RecipeTag } from '../models/tag';
import { RecipesStoreModel } from '../models/recipeStoreModel';

import * as _ from 'lodash';

export const ADD_TAG = 'ADD_TAG';
export const ADD_TAG_SUCCESS = 'ADD_TAG';
export const ADD_TAG_FAILED = 'ADD_TAG';

export const LOAD_TAGS = 'LOAD_TAGS';
export const LOAD_TAGS_SUCCESS = 'LOAD_TAGS_SUCCESS';
export const LOAD_TAGS_FAILED = 'LOAD_TAGS_FAILED';

export const UPDATE_TAG: string = 'UPDATE_TAG';
export const DELETE_TAG: string = 'DELETE_TAG';

export interface State {
	tags: Array<RecipeTag>;
}

const initialState : State = {
	tags: []
};



export const tagReducer: ActionReducer<State> = (state = initialState, action: Action) => {
	switch (action.type) {

		case ADD_TAG_SUCCESS:
		case LOAD_TAGS_SUCCESS:
			console.log('adding some tags, don\'t mind me');
			let newVersion = state.tags.concat(action.payload);
			return Object.assign({}, state, { tags: newVersion });

		case ADD_TAG:
			console.log('adding tag');
			return state;

		// case ADD_RECIPE:
		// 	let x = state.recipes.concat(action.payload);
		// 	return Object.assign({}, state, { recipes: x});

		// case UPDATE_RECIPE:
		// 	let index = _.findIndex(state.recipes, { _id: action.payload._id });
		// 	if(index >= 0) {
		// 		state.recipes = [
		// 			...state.recipes.slice(0, index),
		// 			action.payload,
		// 			...state.recipes.slice(index + 1)
		// 		];
		// 	}
		// 	return state;

		// case DELETE_RECIPE:
		// 	return state;
		
		// case GET_RECIPE:
		// 	state.selectedRecipe = state.recipes.filter(rec => {
		// 		return rec._id === action.payload._id;
		// 	})[0];
		// 	return state;

			

		default:
			return state;
	}
};

//export const tagReducer: ActionReducer
