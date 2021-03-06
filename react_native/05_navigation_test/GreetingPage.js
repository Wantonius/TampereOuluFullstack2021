import React from 'react';
import {View,Text,StyleSheet,TouchableHighlight} from 'react-native';


const GreetingPage = (props) => {
	
	let textcolor = "black";
	let backgroundColor = "white";
	if(props.textcolor) {
		textcolor = props.textcolor.toLowerCase();
	}
	if(props.backgroundColor) {
		backgroundColor = props.backgroundColor.toLowerCase();
	}
	
	let styles = StyleSheet.create({
		container:{
			flex:1,
			alignItems:"center",
			justifyContent:"center",
			backgroundColor:backgroundColor
		},
		text:{
			color:textcolor,
			fontSize:24,
			fontWeight:"bold",
			fontFamily:"sans-serif"
		},
		button:{
			height:80,
			width:110,
			backgroundColor:"red",
			alignItems:"center",
			justifyContent:"center"
		}
	})
	
	return(
		<View style={styles.container}>
			<Text style={styles.text}>Hello {props.firstname} {props.lastname}</Text>
				<TouchableHighlight style={styles.button}
					onPress={() => props.navigation.navigate("GreetingForm")}>
					<Text>Back</Text>
				</TouchableHighlight>			
		</View>
	)
}

export default GreetingPage;