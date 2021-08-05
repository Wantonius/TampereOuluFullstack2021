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
	
	//REST API
	

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
					<Route path="/list" render={() => this.props.isLogged ? (<ShoppingList 
							removeFromList={this.removeFromList}
							editItem={this.editItem}
							/>)
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
		isLogged:state.login.isLogged,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(App);
