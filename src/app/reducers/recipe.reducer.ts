
import { ActionReducer, Action } from '@ngrx/store';

import { Recipe } from '../models/recipe';
import { RecipeTag } from '../models/tag';
import { RecipesStoreModel } from '../models/recipeStoreModel';

import * as _ from 'lodash';

export const LOAD_RECIPES = 'LOAD_RECIPES';
export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_FAILED = 'LOAD_RECIPES_FAILED';

export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAILED = 'ADD_RECIPE_FAILED';

export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const UPDATE_RECIPE_SUCCESS = 'UPDATE_RECIPE_SUCCESS';
export const UPDATE_RECIPE_FAILED = 'UPDATE_RECIPE_FAILED';


export const DELETE_RECIPE = 'DELETE_RECIPE';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAILED = 'DELETE_RECIPE_FAILED';


export const GET_RECIPE = 'GET_RECIPE';

let initialState = new RecipesStoreModel();


export const recipeReducer: ActionReducer<RecipesStoreModel> = ( state = initialState, action: Action) => {
	switch (action.type) {

		case LOAD_RECIPES_SUCCESS:
		case ADD_RECIPE_SUCCESS:
			let x = state.recipes.concat(action.payload);
			return Object.assign({}, state, { recipes: x});

		case ADD_RECIPE_FAILED:
			console.warn('oh crap, add recipe failed');
			return state;

		case LOAD_RECIPES_FAILED:
			console.warn('of crap, loading recipes failed');
			return state;

		case ADD_RECIPE:
			console.log('add recipe was pinged.  Should it have?');
			return state;

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
			console.log('you are deleting this recipe');
			return state;

		case DELETE_RECIPE_SUCCESS:
			console.log('you have deleted this recipe', action.payload._body, state);			
			return Object.assign({}, state, 
				{ 
					recipes: state.recipes.filter(x => x._id !== action.payload._body)
				}
			);

		case DELETE_RECIPE_FAILED:
			console.warn('oh crap, you failed to delete that recipe => ', action.payload);
			return state;
			

		default:
			return state;
	}
};

