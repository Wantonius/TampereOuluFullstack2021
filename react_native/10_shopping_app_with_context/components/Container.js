import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import ShoppingList from './ShoppingList';
import ShoppingForm from './ShoppingForm';
import useAppState from '../hooks/useAppState';
import React from 'react';

const Stack = createNativeStackNavigator();

const Container = (props) => {
	
	const {isLogged,error,loading} = useAppState()
	
	let title = "Shopping App";
	if(loading) {
		title = "Loading ..."
	}
	if(error) {
		title = error;
	}
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				title:title,
				headerStyle:{
					backgroundColor:"#00CCCC"
				}
			}}>
			{isLogged ? (
				<>
					<Stack.Screen name="ShoppingList" component={ShoppingList}/>
					<Stack.Screen name="Add Item" component={ShoppingForm}/>
				</>
					):(
				<>
					<Stack.Screen name="Login" component={LoginPage}/>
				</>
			)}
			</Stack.Navigator>
		</NavigationContainer>
	)
} 

export default Container;