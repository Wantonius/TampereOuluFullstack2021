import React from 'react';
import {FlatList,View,Pressable,Text,StyleSheet} from 'react-native';

const ShoppingList = (props) => {

	return(
		<View style={styles.container}>
			<View style={styles.buttonBox}>
				<Pressable style={styles.navigateButton} onPress={() => props.navigation.navigate("Add Item")}>
					<Text style={styles.textStyle}>Add New Item</Text>
				</Pressable>
			</View>
			<View style={styles.listBox}>
				<FlatList data={props.list}
							renderItem={
								({item}) => {
									return(
										<View style={styles.row}>
											<Text style={styles.textStyle}>
											Type:{item.type}</Text>
											<Text style={styles.textStyle}>
											Count:{item.count}</Text>
											<Text style={styles.textStyle}>
											Price:{item.price}</Text>
											<Pressable 
											style={styles.buttonStyle} 
											onPress={() => props.removeFromList(item.id)}>
												<Text style={styles.textStyle}>Remove</Text>
											</Pressable>
										</View>
									)
								}
							}
						keyExtractor={item => ""+item.id}
					/>
			</View>
	)
}

export default ShoppingList;