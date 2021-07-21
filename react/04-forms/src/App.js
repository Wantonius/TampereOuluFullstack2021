import logo from './logo.svg';
import './App.css';
import NameForm from './NameForm';
import React from 'react';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			greeting:""
		}
	}
	
	setGreeting = (name) => {
		this.setState({
			greeting:"Hello "+name
		})
	}
	
	render() {
		return (
			<div className="App">
				<NameForm setGreeting={this.setGreeting}/>
				<h2>{this.state.greeting}</h2>
			</div>
		);
	}
}

export default App;
