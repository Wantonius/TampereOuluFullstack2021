import {useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import * as actionConstants from '../types/actionConstants';

const initialState = {
	list:[],
	isLogged:false,
	token:"",
	loading:false,
	error:""
}

const listReducer = (state,action) => {
	switch(action.type) {
		case actionConstants.LOADING:
			return {
				...state,
				error:"",
				loading:true
			}
		case actionConstants.STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case actionConstants.REGISTER_SUCCESS:
			return {
				...state,
				error:""
			}
		case actionConstants.REGISTER_FAILED:
			return {
				...state,
				error:action.error
			}
		case actionConstants.LOGIN_SUCCESS:
			return {
				...state,
				isLogged:true,
				token:action.token
			}
		case actionConstants.LOGIN_FAILED:
			return {
				...state,
				error:action.error
			}
		case actionConstants.LOGOUT_SUCCESS:
			return {
				isLogged:false,
				list:[],
				token:"",
				error:"",
				loading:false
			}
		case actionConstants.LOGOUT_FAILED:
			return {
				isLogged:false,
				list:[],
				token:"",
				error:action.error,
				loading:false
			}
		case actionConstants.FETCH_LIST_SUCCESS:
			return {
				...state,
				list:action.list
			}
		case actionConstants.FETCH_LIST_FAILED:
			return {
				...state,
				error:action.error
			}
		case actionConstants.ADD_ITEM_SUCCESS:
			return {
				...state
			}
		case actionConstants.ADD_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case actionConstants.REMOVE_ITEM_SUCCESS:
			return {
				...state
			}
		case actionConstants.REMOVE_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}		
		case actionConstants.EDIT_ITEM_SUCCESS:
			return {
				...state
			}
		case actionConstants.EDIT_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		default:
			return state;
	}
	
}