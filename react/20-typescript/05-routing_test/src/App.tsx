import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link,Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Secret from './components/Secret';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/about">About</Link></li>
				</ul>
				<hr/>
				<Switch>
					<Route exact path="/">
						<Home/>
					</Route>
					<Route path="/about">
						<About name="Erno"/>
					</Route>
					<Route path="/secret/:id" component={Secret}/>
				</Switch>
			</div>
		);
	}
}

export default App;
