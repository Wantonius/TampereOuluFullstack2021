import logo from './logo.svg';
import './App.css';
import React from 'react';
import StateManager from './statemanager/StateManager';
import {Switch,Route,Redirect} from 'react-router-dom';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';

class App extends React.Component {
  render() {
  return (
    <div className="App">
		<Navbar/>
		<hr/>
		<ContactForm/>
    </div>
  );
  }
}

export default StateManager(App);
