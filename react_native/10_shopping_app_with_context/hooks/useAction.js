import {useContext,useState,useEffect} from 'react';
import ActionContext from '../context/ActionContext';
import useAppState from './useAppState';
import * as actionConstants from '../types/actionConstants';

const useAction = () => {
	
	const action = useContext(ActionContext);
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {token} = useAppState();
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!state.url) {
				return;
			}
			action.dispatch({
				type:actionConstants.LOADING				
			})
			let url = "http://to-native-shopping.herokuapp.com"+state.url
			const response = await fetch(url,state.request);
			action.dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(response.ok) {
				switch(state.action) {
					case "register":
						action.dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						const data = await response.json();
						action.dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							token:data.token
						})
						return;
					case "logout":
						action.dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					case "getlist":
						const list = await response.json();
						action.dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					case "additem":
						action.dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						return;
					case "removeitem":
						action.dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						return;
					default:
						return;
				}
			} else {
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							action.dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Username already in use"
							})	
							return;
						}
						action.dispatch({
							type:actionConstants.REGISTER_FAILED,
							error:"Server responded with a status:"+response.status
						})
						return;
					case "login":
						action.dispatch({
							type:actionConstants.LOGIN_FAILED,
							error:"Server responded with a status:"+response.status
						})
						return;
					case "logout":
						action.dispatch({
							type:actionConstants.LOGOUT_FAILED,
							error:"Failed to remove session info. Logging you out!"
						})
						return;
					case "getlist":
						if(response.status === 403) {
							action.dispatch({
								type:actionConstants.LOGOUT_SUCCESS
							})
							action.dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Session has expired. Logging you out!"
							})
							return;
						}
						action.dispatch({
							type.actionConstants.FETCH_LIST_FAILED,
							error:"Server responded with a status:"+response.status
						})
						return;						
					case "additem":
						if(response.status === 403) {
							action.dispatch({
								type:actionConstants.LOGOUT_SUCCESS
							})
							action.dispatch({
								type:actionConstants.ADD_ITEM_FAILED,
								error:"Session has expired. Logging you out!"
							})
							return;
						}
						action.dispatch({
							type.actionConstants.ADD_ITEM_FAILED,
							error:"Server responded with a status:"+response.status
						})
						return;	
					case "removeitem":
						if(response.status === 403) {
							action.dispatch({
								type:actionConstants.LOGOUT_SUCCESS
							})
							action.dispatch({
								type:actionConstants.REMOVE_ITEM_FAILED,
								error:"Session has expired. Logging you out!"
							})
							return;
						}
						action.dispatch({
							type.actionConstants.REMOVE_ITEM_FAILED,
							error:"Server responded with a status:"+response.status
						})
						return;	
					default:
						return;
				}				
			}
		}
		
		fetchData();
		
	},[state])

	const register = (user) => {
		setState({
			url:"/register",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		setState({
			url:"/login",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}

	const logout = (token) => {
		setState({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
			},
			action:"logout"
		})
	}

	const getList = (token) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
			},
			action:"getlist"
		})
	}
	
	const addItem = (token,item) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}

	const removeItem = (token,id) => {
		setState({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token},
			},
			action:"removeitem"
		})
	}
	
	return {
		register,
		login,
		logout,
		getList,
		addItem,
		removeItem
	}
}

export default useAction;