import logo from './logo.svg';
import './App.css';
import React from 'react';
import ContactForm from './components/ContactForm';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			id:100
		}
	}
	
	addToList = (contact) => {
		this.setState((state) => {
			contact.id = state.id;
			return {
				list:state.list.concat(contact),
				id:state.id+1
			}
		})
	}
	
	removeFromList = (id) => {
		this.setState((state) => {
			let tempList = state.list.filter(contact => contact.id !== id);
			return {
				list:tempList
			}
		})
	}
	
	render() {
		return (
			<div className="App">
				<ContactForm addToList={this.addToList}/>
			</div>
		);
	}
}

export default App;
