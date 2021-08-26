import useAction from '../hooks/useaction';
import useAppState from '../hooks/useappstate';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
	
	const {logout} = useAction();
	const state = useAppState();
	
	let header = <h2>Shopping app</h2>
	if(state.loading) {
		header = <h2>Loading ...</h2>
	}
	if(state.error) {
		header = <h2>{state.error}</h2>
	}
	let navStyle = {backgroundColor:"lightblue",height:120}
	if(state.isLogged) {
		return (
			<div style={navStyle}>
				{header}
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/list">Shopping List</Link></li>
					<li><Link to="/form">Add new item</Link></li>
					<li><Link to="#" onClick={() => logout(state.token)}>Logout</Link></li>
				</ul>
			</div>
		)
	} else {
		return (
			<div style={navStyle}>
				{header}
			</div>
		)
	}
}

export default Navbar;