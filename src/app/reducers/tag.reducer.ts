
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
			let newVersion = state.tags.concat(action.payload);
			return Object.assign({}, state, { tags: newVersion });

		case ADD_TAG:
			console.log('adding tag');
			return state;

		default:
			return state;
	}
};

//export const tagReducer: ActionReducer
