
import { ActionReducer, Action } from '@ngrx/store';

import { RecipesStoreModel } from '../models/recipeStoreModel';

import * as _ from 'lodash';

import 'rxjs/add/operator/map';

export const LOAD_RECIPES = 'LOAD_RECIPES';
export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_FAILED = 'LOAD_RECIPES_FAILED';

export const ADD_RECIPE = 'ADD_RECIPE';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAILED = 'ADD_RECIPE_FAILED';

export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const UPDATE_RECIPE_SUCCESS = 'UPDATE_RECIPE_SUCCESS';
export const UPDATE_RECIPE_FAILED = 'UPDATE_RECIPE_FAILED';

export const GET_RECIPE = 'GET_RECIPE';

export const DELETE_RECIPE = 'DELETE_RECIPE';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAILED = 'DELETE_RECIPE_FAILED';

export const UPDATE_FILTER = 'UPDATE_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

export const GET_INSTRUCTIONS = 'GET_INSTRUCTIONS';
export const GET_INSTRUCTIONS_SUCCESS = 'GET_INSTRUCTIONS_SUCCESS';
export const GET_INSTRUCTIONS_FAILED = 'GET_INSTRUCTIONS_FAILED';

let initialState = new RecipesStoreModel();


const filter = (state, action) => {
	switch (action.type) {
		case UPDATE_FILTER:
			let x = state.filterCriteria.concat(action.payload);
			let filteredSet = state.recipes.filter(x => x.recipeName.indexOf(action.payload) > -1);
			return Object.assign({}, state, { filterCriteria: x, recipes: filteredSet });

		default:
			return state;
	}
};


export const recipeReducer : ActionReducer<RecipesStoreModel> = ( state = initialState, action: Action) => {
	switch (action.type) {

		case LOAD_RECIPES_SUCCESS:
		case ADD_RECIPE_SUCCESS:
			let x = state.recipes.concat(action.payload);			
			return Object.assign({}, state, { recipes: x, fullSetRecipes: x});

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
			let index = _.findIndex(state.fullSetRecipes, { _id: action.payload._id });
			if(index >= 0) {
				state.fullSetRecipes = [
					...state.fullSetRecipes.slice(0, index),
					action.payload,
					...state.fullSetRecipes.slice(index + 1)
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
					fullSetRecipes: state.fullSetRecipes.filter(x => x._id !== action.payload._body)
				}
			);

		case DELETE_RECIPE_FAILED:
			console.warn('oh crap, you failed to delete that recipe => ', action.payload);
			return state;

		case UPDATE_FILTER:
			//return state.map(person => filter(person, action));
			let newFilter = state.filterCriteria.concat(action.payload);
			let filteredSet = state.fullSetRecipes.filter(x => 	
				(x.recipeName.toLowerCase().indexOf(action.payload.toLowerCase()) > -1 )
			);
			return Object.assign({}, state, { filterCriteria: newFilter, recipes: filteredSet });

		case REMOVE_FILTER:
			return Object.assign({}, state, { filterCriteria: '', recipes: state.fullSetRecipes });

		case GET_INSTRUCTIONS_SUCCESS:
			let idx = _.findIndex(state.fullSetRecipes, { _id: action.payload._id });
			if (idx >= 0) {
				state.fullSetRecipes = [
					...state.fullSetRecipes.slice(0, idx),
					action.payload,
					...state.fullSetRecipes.slice(index + 1)
				];
			}
			return state;

		case GET_RECIPE:
			let recIdx = _.findIndex(state.fullSetRecipes, { _id: action.payload._id });
			return Object.assign({}, state, { selectedRecipe: state.fullSetRecipes[recIdx]});



			

		default:
			return state;
	}
};

