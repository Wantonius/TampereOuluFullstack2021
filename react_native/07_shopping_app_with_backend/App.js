import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginPage from './components/LoginPage';
const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		list:[],
		isLogged:false,
		token:""
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	useEffect(() => {
		
		const fetchData = async () => {
			let url = "http://to-native-shopping.herokuapp.com"+urlRequest.url
			const response = await fetch(url,urlRequest.request);
			if(response.ok) {
				if(urlRequest.action === "register") {
					alert("Register success!");
				}
				if(urlRequest.action === "login") {
					const data = await response.json();
					setState((state) => { 
						return {
							...state,
							token:data.token,
							isLogged:true
						}
					})
					getList(data.token)
				}
				if(urlRequest.action === "logout") {
					setState({
						list:[],
						isLogged:false,
						token:""
					})
				}
				if(urlRequest.action === "getlist") {
					const list = await response.json();
					setState((state) => {
						return {
							...state,
							list:list
						}
					})
				}
				if(urlRequest.action === "addtolist" || urlRequest.action === "removefromlist") {
					getList(state.token);
				}				
			} else {
				if(response.status === 403) {
					if(urlRequest.action !== "login") {
						setState({
							list:[],
							isLogged:false,
							token:""
						})
					}
				} else {
					console.log("Server responded with a status:"+response.status);
				}
			}
		}
		
		fetchData();
	},[urlRequest])
	
	//LOGIN API
	
	const register = (user) => {
		setUrlRequest({
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

	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:state.token}
			},
			action:"logout"
		})
	}

	//SHOPPING API
	
	const getList = (token) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:token}
			},
			action:"getlist"
		})
	}
	
	const addToList = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:state.token},
				body:JSON.stringify(item)
			},
			action:"addtolist"
		})
	}

	const removeFromList = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json",
				token:state.token}
			},
			action:"removefromlist"
		})
	}	
	return (
		<NavigationContainer>
			<Stack.Navigator>
			{state.isLogged ? (
				<>
					<Stack.Screen name="ShoppingList">
					{props => <ShoppingList {...props} list={state.list} removeFromList={removeFromList}/>}
					</Stack.Screen>
					<Stack.Screen name="Add Item">
					{props => <ShoppingForm {...props} addToList={addToList}/>}
					</Stack.Screen>
				</>
				):(
				<>
					<Stack.Screen name="Login">
					{props => <LoginPage {...props} login={login} register={register}/>}
					</Stack.Screen>
				</>
				)
			}
			</Stack.Navigator>		
		</NavigationContainer>
	);
}

