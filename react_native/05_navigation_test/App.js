import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GreetingForm from './GreetingForm';
import GreetingPage from './GreetingPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		textcolor:"",
		backgroundColor:""
	})
	
	const setGreeting = (data) => {
		setState({
			firstname:data.firstname,
			lastname:data.lastname,
			textcolor:data.textcolor,
			backgroundColor:data.backgroundColor
		})
	}
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="GreetingForm">
				{props => <GreetingForm {...props} setGreeting={setGreeting}/>}
				</Stack.Screen>
				<Stack.Screen name="GreetingPage" options={{
					headerLeft:() => null 
				}}>
				{props => <GreetingPage {...props} {...state}/>}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

