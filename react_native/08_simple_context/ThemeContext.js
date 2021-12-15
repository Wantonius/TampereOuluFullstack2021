import React from 'react';

export const themes = {
	light:{
		textcolor:"#000000",
		background:"#d3d3d3"
	},
	dark:{
		textcolor:"#ffffff",
		background:"#595959"
	}
}

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;