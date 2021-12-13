import React,{useState} from 'react';
import {View,Text,StyleSheet,TouchableHighlight,Modal} from 'react-native';

const ModalView = (props) => {

	const [state,setState] = useState({
		visible:false
	})
	
	return(
		<View style={styles.container}>
			<Modal
				animationType="fade"
				transparent={false}
				visible={state.visible}
				onRequestClose={() => {
					setState({
						visible:false
					})
				}}
			>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Press to close</Text>
					<TouchableHighlight style={styles.closeButton}
						onPress={() => setState({visible:false})}>
						<Text>Close</Text>
					</TouchableHighlight>
				</View>
			</Modal>
			<TouchableHighlight style={styles.openButton}
				onPress={() => setState({visible:true})}>
					<Text>Press to Open</Text>
			</TouchableHighlight>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	modalView:{
		margin:10,
		backgroundColor:"lightblue",
		padding:20,
		alignItems:"center",
		shadowColor:"#000",
		shadowOffset:{
			width:0,
			height:2
		},
		shadowOpacity:0.25,
		shadowRadius:4,
		elevation:5
	},
	openButton:{
		width:100,
		height:50,
		backgroundColor:"green"
	},
	closeButton:{
		width:100,
		height:50,
		backgroundColor:"red"
	},
	modalText:{
		textAlign:"center"
	}
})

export default ModalView;