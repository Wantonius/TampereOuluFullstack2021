import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';



const styles = StyleSheet.create({
	mainWindow: {
		flex:1
	},
	textWindow: {
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	container: {
		flex:10,
		backgroundColor:"#fff",
		flexDirection:"row"
	},
	rowContainer: {
		flex:1,
		alignItems:"center",
		justifyContent:"space-around"
	},
	blueButton: {
		backgroundColor:"blue",
		alignItems:"center",
		justifyContent:"center",
		width:50,
		height:50
	}
});
