import logo from './logo.svg';
import './App.css';
import React from 'react';
import ShoppingForm from './components/ShoppingForm';
import Navbar from './components/Navbar';
import ShoppingList from './components/ShoppingList';
import LoginPage from './components/LoginPage';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}

	
	//LOGIN API
	


	
	//REST API
	
	getList = (search,price) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.props.token}
		}
		let url = "/api/shopping"
		if(search) {
			url = url + "?type="+search;
			if(price) {
				url = url + "&price="+price;
			}
		}
		fetch(url,request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					})
				}).catch(error => {
					console.log("Failed to parse JSON, reason:"+error)
				})
			} else {
				if(response.status === 403) {
					console.log("Session has expired. Logging out!");
				}
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log(error)
		});
	}
	
	addToList = async (item) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
						"token":this.props.token},
			body:JSON.stringify(item)
		}
		const response = await fetch("/api/shopping",request).catch(error => console.log(error));
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList();
		} else {
			if(response.status === 403) {
				console.log("Session has expired. Logging out!");
			}
			console.log("Failed to add to list. Server responded with a status:"+response.status)
		}
	}


	removeFromList = async (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
						"token":this.props.token}
		}
		const response = await fetch("/api/shopping/"+id,request).catch(error => console.log(error));
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList();
		} else {
			if(response.status === 403) {
				console.log("Session has expired. Logging out!");
			}
			console.log("Failed to remove from list. Server responded with a status:"+response.status)
		}
	}

	editItem = async (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.props.token},
			body:JSON.stringify(item)
		}
		const response = await fetch("/api/shopping/"+item._id,request).catch(error => console.log(error));
		if(!response) {
			return;
		}
		if(response.ok) {
			this.getList();
		} else {
			if(response.status === 403) {
				console.log("Session has expired. Logging out!");
			}
			console.log("Failed to edit item. Server responded with a status:"+response.status)
		}
	}
	
	render() {
		return (
			<div className="App">
				<Navbar />
				<hr/>
				<Switch>
					<Route exact path="/" render={() => this.props.isLogged ? 
						(<Redirect to="/list"/>) 
						: 
						(<LoginPage />)
					}/>
					<Route path="/list" render={() => this.props.isLogged ? (<ShoppingList list={this.state.list}
							removeFromList={this.removeFromList}
							editItem={this.editItem}
							getList={this.getList}/>)
						: 
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() => this.props.isLogged? (<ShoppingForm addToList={this.addToList}/>)
						:
						(<Redirect to="/"/>)
					}/>
					<Route render={() => this.props.isLogged ? 
						(<Redirect to="list"/>)
						:
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token
	}
}

export default connect(mapStateToProps)(App);
