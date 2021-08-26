import {useContext,useEffect,useState,useMemo} from 'react';
import ReducerContext from './context/ReducerContext';
import {ActionConstants} from './actionconstants';

const useAction = () => {
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:"",
		token:""
	})
	
	const dispatch = useContext(ReducerContext);
	
	if(!dispatch) {
		console.log("Needs to be under the StateProvider");
	}
	
	useEffect(() => {
		if(urlRequest.url === "") {
			return;
		}
		const fetchData = async () => {
			dispatch(ActionConstants.LOADING);
			const response = await fetch(urlRequest.url,urlRequest.request);
			dispatch(ActionConstants.STOP_LOADING);
			if(response.ok) {
				if(urlRequest.action === "register") {
					dispatch({
						type:ActionConstants.REGISTER_SUCCESS
					})
					return;
				}
				if(urlRequest.action === "login") {
					const data = await response.json();
					dispatch({
						type:ActionConstants.LOGIN_SUCCESS,
						token:data.token
					})
					setUrlRequest({
						url:"",
						request:{},
						action:"",
						token:data.token
					})
					fetchList(data.token);
					return;
				}
				if(urlRequest.action === "logout") {
					dispatch({
						type:ActionConstants.LOGOUT_SUCCESS
					})
					return;
				}
				if(urlRequest.action === "fetch") {
					const list = await response.json();
					dispatch({
						type:ActionConstants.FETCH_SUCCESS,
						list:list
					})
					return;
				}
				if(urlRequest.action === "add") {
					dispatch({
						type:ActionConstants.ADD_SUCCESS
					})
					fetchList(urlRequest.token);
					return;
				}
				if(urlRequest.action === "remove") {
					dispatch({
						type:ActionConstants.REMOVE_SUCCESS
					})
					fetchList(urlRequest.token);
					return;
				}
			} else {
				if(urlRequest.action === "register") {
					dispatch({
						type:ActionConstants.REGISTER_FAILED,
						error:"Register failed. Is username already in use?"
					})
					return;
				}
				if(urlRequest.action === "login") {
					dispatch({
						type:ActionConstants.LOGIN_FAILED,
						error:"Wrong username or password!"
					})
					return;
				}
				if(urlRequest.action === "logout") {
					dispatch({
						type:ActionConstants.LOGOUT_FAILED,
						error:"Server responded with an error. Logging you out!"
					})
					return;
				}
				if(urlRequest.action === "fetch") {
					if(response.status === 403) {
						dispatch({
							type:ActionConstants.LOGOUT_SUCCESS
						})
						dispatch({
							type:ActionConstants.FETCH_FAILED,
							error:"Session expired! Login again."
						})
						return;
					} 
					dispatch({
						type:ActionConstants.FETCH_FAILED,
						error:"Server responded with a status "+response.status
					})
					return;
				}
				if(urlRequest.action === "add") {
					if(response.status === 403) {
						dispatch({
							type:ActionConstants.LOGOUT_SUCCESS
						})
						dispatch({
							type:ActionConstants.ADD_FAILED,
							error:"Session expired! Login again."
						})
						return;
					} 
					dispatch({
						type:ActionConstants.ADD_FAILED,
						error:"Server responded with a status "+response.status
					})
					return;
				}
				if(urlRequest.action === "remove") {
					if(response.status === 403) {
						dispatch({
							type:ActionConstants.LOGOUT_SUCCESS
						})
						dispatch({
							type:ActionConstants.REMOVE_FAILED,
							error:"Session expired! Login again."
						})
						return;
					} 
					dispatch({
						type:ActionConstants.REMOVE_FAILED,
						error:"Server responded with a status "+response.status
					})
					return;
				}				
			}
		}
		
		fetchData();
	},[urlRequest]);
	
	const register = (user) => {
		setUrlRequest({
			...urlRequest,
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
		setUrlRequest({
			...urlRequest,
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
		setUrlRequest({
			...urlRequest,
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":token}
			},
			action:"logout"
		})
	}

	const fetchList = (token) => {
		setUrlRequest({
			...urlRequest,
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":token}
			},
			action:"fetch"
		})
	}
	
	const add = (token,item) => {
		setUrlRequest({
			...urlRequest,
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":token},
				body:JSON.stringify(item)
			},
			action:"add"
		})
	}
	
	const remove = (token,id) => {
		setUrlRequest({
			...urlRequest,
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":token}
			},
			action:"remove"
		})
	}
	
	return useMemo(() => ({
		register,
		login,
		logout,
		fetchList,
		add,
		remove
	}),[dispatch])
}

export default useAction;