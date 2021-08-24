import React from 'react';
import StateManager from '../statemanager/StateManager';

class LoginPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}
	
	onChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		if(event.target.name === "login") {
			this.props.login();
		}
	}
	
	render() {
		return(
			<form>
				<label htmlFor="username">Username</label>
				<input type="text"
						name="username"
						onChange={this.onChange}
						value={this.state.username}/>
				<br/>
				<label htmlFor="password">Password</label>
				<input type="password"
						name="password"
						onChange={this.onChange}
						value={this.state.password}/>
				<br/>
				<button name="register">Register</button>
				<button name="login" onClick={this.onSubmit}>Login</button>
			</form>
		)
	}
}

export default StateManager(LoginPage);