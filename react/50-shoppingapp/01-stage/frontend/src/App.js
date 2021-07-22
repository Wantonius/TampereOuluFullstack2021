import logo from './logo.svg';
import './App.css';
import React from 'react';
import ShoppingForm from './components/ShoppingForm';
import {Switch,Route} from 'react-router-dom';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}
	
	//REST API
	
	getList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					})
				}).catch(error => {
					console.log("Failed to parse JSON, reason:"+error)
				})
			} else {
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log(error)
		});
	}
	
	render() {
		return (
			<div className="App">

			</div>
		);
	}
}

export default App;
