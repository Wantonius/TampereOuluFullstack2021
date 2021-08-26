import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import Navbar from './components/Navbar';
import {Switch,Route,Redirect} from 'react-router-dom';
import useAppState from './hooks/useappstate';

function App() {
	
	const state = useAppState();
	
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Switch>
				<Route exact path="/" render={() => state.isLogged ? 
					(<Redirect to="/list"/>):
					(<LoginPage/>)
				}/>
				<Route path="/list" render={() => state.isLogged ? 
					(<ShoppingList/>):
					(<Redirect to="/"/>)
				}/>
				<Route path="/form" render={() => state.isLogged ?
					(<ShoppingForm/>):
					(<Redirect to="/"/>)
				}/>
			</Switch>
		</div>
	);
}

export default App;
