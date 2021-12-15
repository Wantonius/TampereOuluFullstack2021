import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeContext,{themes} from './ThemeContext';
import Headline from './Headline';
import Paragraph from './Paragraph';
import ThemeButton from './ThemeButton';
export default function App() {
	
	const [state,setState] = useState({
		theme:themes.dark
	})
	
	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}
	
	return (
		<ThemeContext.Provider value={state.theme}>
			<View style={styles.container}>
				<Headline>
				Context
				</Headline>
				<Paragraph>
				Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.
				</Paragraph>
				<ThemeButton toggleTheme={toggleTheme}/>
			</View>
		</ThemeContext.Provider>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
