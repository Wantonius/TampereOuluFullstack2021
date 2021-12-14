import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';

const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})
	
	const addToList = (item) => {
		item.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	}
	
	const removeFromList = (id) => {
		setState((state) => {
			let templist = state.list.filter(item => item.id !== id);
			return {
				...state,
				list:templist
			}
		})
	}
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="ShoppingList">
				{props => <ShoppingList {...props} removeFromList={removeFromList} list={state.list}/>}
				</Stack.Screen>
				<Stack.Screen name="Add Item">
				{props => <ShoppingForm {...props} addToList={addToList}/>}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}


