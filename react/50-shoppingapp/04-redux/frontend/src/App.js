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
					<Route path="/list" render={() => this.props.isLogged ? (<ShoppingList />)
						: 
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() => this.props.isLogged? (<ShoppingForm />)
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
