import logo from './logo.svg';
import './App.css';
import React from 'react';
import StateManager from './statemanager/StateManager';
import {Switch,Route,Redirect} from 'react-router-dom';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ContactList from './components/ContactList';

class App extends React.Component {
  render() {
  return (
    <div className="App">
		<Navbar/>
		<hr/>
		<Switch>
			<Route exact path="/" render={() => this.props.isLogged ?
			(<Redirect to="/list"/>) :
			(<LoginPage/>)
			}/>
			<Route path="/list" render={() => this.props.isLogged ?
			(<ContactList/>) :
			(<Redirect to="/"/>)
			}/>
			<Route path="/form" render={() => this.props.isLogged ?
			(<ContactForm/>) :
			(<Redirect to="/"/>)
			}/>
		</Switch>
    </div>
  );
  }
}

export default StateManager(App);
