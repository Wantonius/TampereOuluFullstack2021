import logo from './logo.svg';
import './App.css';
import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Navbar from './components/Navbar';
import {Switch,Route} from 'react-router-dom';

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
				<Navbar/>
				<hr/>
				<Switch>
					<Route exact path="/" render={ () => {
						return (<ContactList list={this.state.list} removeFromList={this.removeFromList}/>)}
					}/>
					<Route path="/form" render={ () => {
						return (<ContactForm addToList={this.addToList}/>)}
					}/>				
				</Switch>
			</div>
		);
	}
}

export default App;
