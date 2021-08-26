import {useReducer} from 'react';
import StateContext from '../context/StateContext';
import ReducerContext from '../context/ReducerContext';
import {ActionConstants} from '../actionconstants';

const initialState = {
	loading:false,
	error:"",
	list:[],
	token:"",
	isLogged:false
}

const reducer = (state,action) => {
	let tempState = {}
	switch(action.type) {
			case ActionConstants.LOADING:
				return {
					...state,
					loading:true,
					error:""
				}
			case ActionConstants.STOP_LOADING:
				return {
					...state,
					loading:false,
					error:""
				}
			case ActionConstants.REGISTER_SUCCESS:
				tempState = {
					...state,
					error:"Register success!"
				}
				return tempState;
			case ActionConstants.REGISTER_FAILED:
				tempState = {
					...state,
					error:action.error
				}
				return tempState;
			case ActionConstants.LOGIN_SUCCESS:
				tempState = {
					...state,
					isLogged:true,
					token:action.token,
					error:""
				}
				return tempState;
			case ActionConstants.LOGIN_FAILED:
				tempState = {
					...state,
					error:action.error
				}
				return tempState;
			case ActionConstants.LOGOUT_SUCCESS:
				tempState = {
					loading:false,
					list:[],
					error:"",
					isLogged:false,
					token:""
				}
				return tempState;
			case ActionConstants.LOGOUT_FAILED:
				tempState = {
					loading:false,
					list:[],
					error:action.error,
					isLogged:false,
					token:""
				}
				return tempState;
			case ActionConstants.FETCH_SUCCESS:
				tempState = {
					...state,
					list:action.list,
					error:""
				}
				return tempState;
			case ActionConstants.FETCH_FAILED:
				tempState = {
					...state,
					error:action.error
				}
				return tempState;
			case ActionConstants.ADD_SUCCESS:
				tempState = {
					...state,
					error:""
				}
				return tempState;
			case ActionConstants.ADD_FAILED:
				tempState = {
					...state,
					error:action.error
				}
				return tempState;
			case ActionConstants.REMOVE_SUCCESS:
				tempState = {
					...state,
					error:""
				}
				return tempState;
			case ActionConstants.REMOVE_FAILED:
				tempState = {
					...state,
					error:action.error
				}
				return tempState;
			default:
				return state;
	}
}

const StateProvider = (props) => {
	const [state,dispatch] = useReducer(reducer,initialState);
	return (
		<StateContext.Provider value={state}>
			<ReducerContext.Provider value={dispatch}>
				{props.children}
			</ReducerContext.Provider>
		</StateContext.Provider>
	)
}

export default StateProvider;