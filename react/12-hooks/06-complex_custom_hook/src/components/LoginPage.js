import {useState} from 'react';
import useAction from '../hooks/useaction';

const LoginPage = (props) => {
	
	const [state,setState] = useState({
		username:"",
		password:""
	})
	
	const {register,login} = useAction();
	
	const onChange = (event) => {
		setState({
			...state,
			[event.target.name]:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			alert("Username needs to be 4 characters and password 8 characters long!");
			return;
		}
		let user = {
			username:state.username,
			password:state.password
		}
		if(event.target.name === "register") {
			register(user);
		} else {
			login(user);
		}
	}
	
	return(
		<form>
			<label htmlFor="username">Username</label>
			<input type="text"
					name="username"
					onChange={onChange}
					value={state.username}/>
			<br/>
			<label htmlFor="password">Password</label>
			<input type="password"
					name="password"
					onChange={onChange}
					value={state.password}/>
			<br/>
			<button onClick={onSubmit} name="register">Register</button>
			<button onClick={onSubmit} name="login">Login</button>
		</form>
	)
	
}

export default LoginPage;