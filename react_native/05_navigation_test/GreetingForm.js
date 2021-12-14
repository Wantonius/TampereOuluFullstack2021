import React,{useState} from 'react';
import {View,TouchableHighlight,Text,TextInput,StyleSheet} from 'react-native';

const GreetingForm = (props) => {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		textcolor:"",
		backgroundColor:""
	})
	
	const setGreeting = () => {
		let data = {
			...state
		}
		props.setGreeting(data);
		setState({
			firstname:"",
			lastname:"",
			textcolor:"",
			backgroundColor:""
		})
		props.navigation.navigate("GreetingPage");
	}
	
	return(
		<View style={styles.container}>
			<View style={styles.row}>
				<Text>First Name</Text>
				<TextInput onChangeText={(text) => setState((state) => {
					return {
						...state,
						firstname:text
					}
				}) 
				}/>
			</View>
			<View style={styles.row}>
				<Text>Last Name</Text>
				<TextInput onChangeText={(text) => setState((state) => {
					return {
						...state,
						lastname:text
					}
				}) 
				}/>
			</View>
			<View style={styles.row}>
				<Text>Text Color</Text>
				<TextInput onChangeText={(text) => setState((state) => {
					return {
						...state,
						textcolor:text
					}
				}) 
				}/>
			</View>
			<View style={styles.row}>
				<Text>Background Color</Text>
				<TextInput onChangeText={(text) => setState((state) => {
					return {
						...state,
						backgroundColor:text
					}
				}) 
				}/>
			</View>			
			<View style={styles.buttonRow}>
				<TouchableHighlight style={styles.button}
					onPress={() => setGreeting()}>
					<Text>Set Greeting</Text>
				</TouchableHighlight>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:"center"
	},
	row:{
		flex:1,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between"
	},
	buttonRow:{
		flex:1,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center"
	},
	button:{
		height:80,
		width:110,
		backgroundColor:"green",
		alignItems:"center",
		justifyContent:"center"
	}
})

export default GreetingForm;