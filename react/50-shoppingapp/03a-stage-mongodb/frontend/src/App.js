import logo from './logo.svg';
import './App.css';
import React from 'react';
import ShoppingForm from './components/ShoppingForm';
import Navbar from './components/Navbar';
import ShoppingList from './components/ShoppingList';
import LoginPage from './components/LoginPage';
import {Switch,Route,Redirect} from 'react-router-dom';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			isLogged:false,
			token:""
		}
	}
	
	componentDidMount() {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state,() => {
				if(this.state.isLogged) {
					this.getList();
				}
			})
		}
		
	}
	
	clearState = () => {
		this.setState({
			list:[],
			isLogged:false,
			token:""
		}, () => {
			this.saveToStorage()
		})
	}
	
	saveToStorage = () => {
		sessionStorage.setItem("state",JSON.stringify(this.state));
	}
	
	//LOGIN API
	
	register = async (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		let response = await fetch("/register",request).catch(error => {
			console.log("There was an error:"+error)
		});
		if(!response) {
			return;
		}
		if(response.ok) {
			alert("Register success");
		} else {
			if(response.status === 409) {
				console.log("Username is already in use")
			}
			console.log("Server responded with a status:"+response.status)
		}
	}
	
	login = async (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		let response = await fetch("/login",request).catch(error => {
			console.log("There was an error:"+error)
		});
		if(!response) {
			return;
		}
		if(response.ok) {
			let data = await response.json().catch(error => {
				console.log("Error parsing json:"+error);
			});
			if(!data) {
				console.log("Failed to parse json")
				return;
			}
			this.setState({
				isLogged:true,
				token:data.token
			}, () => {
				this.saveToStorage();
				this.getList();
			})
		} else {
			console.log("Server responded with a status:"+response.status)
		}			
	}
	
	logout = async () => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token}
		}
		let response = await fetch("/logout",request).catch(error => {
			console.log("There was an error");
			this.clearState();
		})
		if(!response) {
			return;
		}
		if(response.ok) {
			this.clearState();
		} else {
			this.clearState();
			console.log("Server responded with a status:"+response.status);
		}
	}
	
	//REST API
	
	getList = (search,price) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token}
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
					}, () => {
						this.saveToStorage();
					})
				}).catch(error => {
					console.log("Failed to parse JSON, reason:"+error)
				})
			} else {
				if(response.status === 403) {
					console.log("Session has expired. Logging out!");
					this.clearState();
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
						"token":this.state.token},
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
				this.clearState();
			}
			console.log("Failed to add to list. Server responded with a status:"+response.status)
		}
	}


	removeFromList = async (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
						"token":this.state.token}
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
				this.clearState();
			}
			console.log("Failed to remove from list. Server responded with a status:"+response.status)
		}
	}

	editItem = async (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":this.state.token},
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
				this.clearState();
			}
			console.log("Failed to edit item. Server responded with a status:"+response.status)
		}
	}
	
	render() {
		return (
			<div className="App">
				<Navbar logout={this.logout} isLogged={this.state.isLogged}/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() => this.state.isLogged ? 
						(<Redirect to="/list"/>) 
						: 
						(<LoginPage register={this.register} login={this.login}/>)
					}/>
					<Route path="/list" render={() => this.state.isLogged ? (<ShoppingList list={this.state.list}
							removeFromList={this.removeFromList}
							editItem={this.editItem}
							getList={this.getList}/>)
						: 
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() => this.state.isLogged? (<ShoppingForm addToList={this.addToList}/>)
						:
						(<Redirect to="/"/>)
					}/>
					<Route render={() => this.state.isLogged ? 
						(<Redirect to="list"/>)
						:
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
	}
}

export default App;
