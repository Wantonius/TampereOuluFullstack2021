import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const GreetingPage = (props) => {
	
	let styles = StyleSheet.create({
		container:{
			flex:1,
			alignItems:"center",
			justifyContent:"center",
			backgroundColor:props.backgroundColor
		},
		text:{
			color:props.textcolor,
			fontSize:24,
			fontWeight:"bold",
			fontFamily:"sans-serif"
		}
	})
	
	return(
		
	)
}