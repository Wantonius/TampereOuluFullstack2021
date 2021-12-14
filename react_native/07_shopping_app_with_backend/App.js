import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';

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
			let url = "http://to-native-shopping.herokuapp.com"+url
			const response = await fetch(urlRequest.url,urlRequest.request);
			if(response.ok) {
				if(urlRequest.action === "register") {
					alert("Register success!")
				}
				if(urlRequest.action === "login") {
					const data = await response.json();
					setState((state) => {
						...state,
						token:data.token,
						isLogged:true
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
	
	return (

	);
}

