import React from 'react';
import {Link} from 'react-router-dom';
import {Header,List} from 'semantic-ui-react';

export default class Navbar extends React.Component {
	
	render() {
		let navStyle={
			backgroundColor:"lightgreen",
			height:120
		}
		return (
			<div style={navStyle}>
				<Header>Contact app</Header>
				<List>
					<List.Item><Link to="/">Contact List</Link></List.Item>
					<List.Item><Link to="/form">Add new contact</Link></List.Item>
				</List>
			</div>
		)
	} 
}