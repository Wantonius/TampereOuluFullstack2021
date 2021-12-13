import React,{useState} from 'react';
import {View,Text,Pressable,FlatList,StyleSheet} from 'react-native';

const ContactList = (props) => {

	const [state,setState] = useState({
		data:[
	{
		"name": "Barrett Barker",
		"age": 67,
		"id": 1
	},
	{
		"name": "Hu Moses",
		"age": 28,
		"id": 2
	},
	{
		"name": "Tanya Larsen",
		"age": 35,
		"id": 3
	},
	{
		"name": "Ezekiel Malone",
		"age": 36,
		"id": 4
	},
	{
		"name": "Jason Drake",
		"age": 59,
		"id": 5
	},
	{
		"name": "Damian Petty",
		"age": 70,
		"id": 6
	},
	{
		"name": "Micah Mcpherson",
		"age": 26,
		"id": 7
	},
	{
		"name": "Ima Reeves",
		"age": 38,
		"id": 8
	},
	{
		"name": "Willow Albert",
		"age": 98,
		"id": 9
	},
	{
		"name": "Abraham Lawrence",
		"age": 96,
		"id": 10
	},
	{
		"name": "Danielle Dale",
		"age": 71,
		"id": 11
	},
	{
		"name": "Armando Carpenter",
		"age": 70,
		"id": 12
	},
	{
		"name": "Daryl Page",
		"age": 60,
		"id": 13
	},
	{
		"name": "Evangeline Robinson",
		"age": 72,
		"id": 14
	},
	{
		"name": "Uma Meyer",
		"age": 65,
		"id": 15
	},
	{
		"name": "Keelie Shaw",
		"age": 70,
		"id": 16
	},
	{
		"name": "Finn Campos",
		"age": 32,
		"id": 17
	},
	{
		"name": "Quyn Leach",
		"age": 99,
		"id": 18
	},
	{
		"name": "Brody Stevenson",
		"age": 23,
		"id": 19
	},
	{
		"name": "Keefe Perry",
		"age": 100,
		"id": 20
	},
	{
		"name": "Joel Aguilar",
		"age": 60,
		"id": 21
	},
	{
		"name": "Kato Gilliam",
		"age": 44,
		"id": 22
	},
	{
		"name": "Sybill Cotton",
		"age": 56,
		"id": 23
	},
	{
		"name": "Dorothy Harding",
		"age": 60,
		"id": 24
	},
	{
		"name": "Naomi Goodwin",
		"age": 24,
		"id": 25
	},
	{
		"name": "Montana Harrell",
		"age": 60,
		"id": 26
	},
	{
		"name": "Jolie Kelley",
		"age": 82,
		"id": 27
	},
	{
		"name": "Joseph Murphy",
		"age": 31,
		"id": 28
	},
	{
		"name": "Keith Huff",
		"age": 60,
		"id": 29
	},
	{
		"name": "Amanda Pate",
		"age": 92,
		"id": 30
	},
	{
		"name": "Tanner Rivas",
		"age": 74,
		"id": 31
	},
	{
		"name": "Ebony Alford",
		"age": 53,
		"id": 32
	},
	{
		"name": "Paloma Andrews",
		"age": 77,
		"id": 33
	},
	{
		"name": "Rooney Gordon",
		"age": 35,
		"id": 34
	},
	{
		"name": "Sara Romero",
		"age": 62,
		"id": 35
	},
	{
		"name": "Noah Dickson",
		"age": 25,
		"id": 36
	},
	{
		"name": "Griffith York",
		"age": 66,
		"id": 37
	},
	{
		"name": "Olga Goodman",
		"age": 69,
		"id": 38
	},
	{
		"name": "Reuben Hull",
		"age": 70,
		"id": 39
	},
	{
		"name": "Cullen Hale",
		"age": 73,
		"id": 40
	},
	{
		"name": "Owen Franco",
		"age": 79,
		"id": 41
	},
	{
		"name": "Bert Hester",
		"age": 32,
		"id": 42
	},
	{
		"name": "Wing Wooten",
		"age": 97,
		"id": 43
	},
	{
		"name": "Rooney Noel",
		"age": 86,
		"id": 44
	},
	{
		"name": "Remedios James",
		"age": 86,
		"id": 45
	},
	{
		"name": "Brennan Daniels",
		"age": 97,
		"id": 46
	},
	{
		"name": "Erica Hendrix",
		"age": 41,
		"id": 47
	},
	{
		"name": "Carolyn Duke",
		"age": 27,
		"id": 48
	},
	{
		"name": "Gary Baldwin",
		"age": 82,
		"id": 49
	},
	{
		"name": "Madaline Wheeler",
		"age": 96,
		"id": 50
	},
	{
		"name": "Mira Burt",
		"age": 41,
		"id": 51
	},
	{
		"name": "Eaton Branch",
		"age": 99,
		"id": 52
	},
	{
		"name": "Steel Erickson",
		"age": 90,
		"id": 53
	},
	{
		"name": "Alyssa Leblanc",
		"age": 44,
		"id": 54
	},
	{
		"name": "Cullen Shaffer",
		"age": 71,
		"id": 55
	},
	{
		"name": "Nolan Kidd",
		"age": 76,
		"id": 56
	},
	{
		"name": "Lani Atkinson",
		"age": 23,
		"id": 57
	},
	{
		"name": "Ferdinand Turner",
		"age": 46,
		"id": 58
	},
	{
		"name": "Simon Paul",
		"age": 39,
		"id": 59
	},
	{
		"name": "Ruth David",
		"age": 53,
		"id": 60
	},
	{
		"name": "Skyler Moran",
		"age": 97,
		"id": 61
	},
	{
		"name": "Shelby Allen",
		"age": 53,
		"id": 62
	},
	{
		"name": "Ginger Reed",
		"age": 40,
		"id": 63
	},
	{
		"name": "Zane Carlson",
		"age": 20,
		"id": 64
	},
	{
		"name": "Mira Fry",
		"age": 40,
		"id": 65
	},
	{
		"name": "Elijah Lowery",
		"age": 24,
		"id": 66
	},
	{
		"name": "Declan Smith",
		"age": 86,
		"id": 67
	},
	{
		"name": "Ronan Marquez",
		"age": 66,
		"id": 68
	},
	{
		"name": "Louis Oneal",
		"age": 22,
		"id": 69
	},
	{
		"name": "Serina Wong",
		"age": 90,
		"id": 70
	},
	{
		"name": "Jason Rodgers",
		"age": 68,
		"id": 71
	},
	{
		"name": "Orli Delgado",
		"age": 62,
		"id": 72
	},
	{
		"name": "Alfreda Harvey",
		"age": 71,
		"id": 73
	},
	{
		"name": "Colin Fuentes",
		"age": 46,
		"id": 74
	},
	{
		"name": "Hunter Chan",
		"age": 48,
		"id": 75
	},
	{
		"name": "Kylie Mcintyre",
		"age": 62,
		"id": 76
	},
	{
		"name": "Camille Marks",
		"age": 80,
		"id": 77
	},
	{
		"name": "Cameron Hampton",
		"age": 28,
		"id": 78
	},
	{
		"name": "Gil Jackson",
		"age": 90,
		"id": 79
	},
	{
		"name": "Howard Baird",
		"age": 56,
		"id": 80
	},
	{
		"name": "Beck Anthony",
		"age": 80,
		"id": 81
	},
	{
		"name": "Astra Spears",
		"age": 79,
		"id": 82
	},
	{
		"name": "Dennis Mcfadden",
		"age": 43,
		"id": 83
	},
	{
		"name": "Zenaida George",
		"age": 61,
		"id": 84
	},
	{
		"name": "Leila Stokes",
		"age": 98,
		"id": 85
	},
	{
		"name": "Isaac Eaton",
		"age": 29,
		"id": 86
	},
	{
		"name": "Melodie Meyer",
		"age": 26,
		"id": 87
	},
	{
		"name": "Zelda Walters",
		"age": 65,
		"id": 88
	},
	{
		"name": "Brent Calderon",
		"age": 70,
		"id": 89
	},
	{
		"name": "Declan Schwartz",
		"age": 59,
		"id": 90
	},
	{
		"name": "Shad Potts",
		"age": 26,
		"id": 91
	},
	{
		"name": "Ian Glover",
		"age": 98,
		"id": 92
	},
	{
		"name": "Carolyn Strickland",
		"age": 52,
		"id": 93
	},
	{
		"name": "Xander Schneider",
		"age": 99,
		"id": 94
	},
	{
		"name": "Basil Barrett",
		"age": 20,
		"id": 95
	},
	{
		"name": "Madonna Bauer",
		"age": 74,
		"id": 96
	},
	{
		"name": "Xandra Johnston",
		"age": 99,
		"id": 97
	},
	{
		"name": "Lucas Walters",
		"age": 78,
		"id": 98
	},
	{
		"name": "Paki Chaney",
		"age": 49,
		"id": 99
	},
	{
		"name": "Louis Bryan",
		"age": 90,
		"id": 100
	}
	]
	})
	
	const removeContact = (id) => {
		setState((state) => {
			let templist = state.data.filter(contact => contact.id !== id);
			return {
				data:templist
			}
		})
	}
	
	return(
		<View>
			<FlatList data={state.data}
						renderItem={({item}) => {
							return(
								<View style={styles.rowStyle}>
									<Text style={styles.textStyle}>
										{item.name}, {item.age}
									</Text>
									<Pressable 
										style={styles.buttonStyle}
										onPress={() => removeContact(item.id)}>
										<Text>Remove</Text>
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

const styles = StyleSheet.create({
	rowStyle:{
		flexDirection:"row",
		height:60,
		alignItems:"center",
		justifyContent:"space-between"
	},
	textStyle:{
		fontFamily:"sans-serif",
		fontSize:18,
		fontWeight:"bold"
	},
	buttonStyle:{
		width:80,
		height:50,
		borderRadius:5,
		backgroundColor:"red",
		alignItems:"center",
		justifyContent:"center"
	}
})


export default ContactList;