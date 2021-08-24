import React from 'react';
import StateManager from '../statemanager/StateManager';

class ContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:"",
			phone:"",
			email:"",
			address:"",
			city:""
		}
	}
	
	onChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			...this.state
		}
		this.props.addToList(contact);
		this.setState({
			firstname:"",
			lastname:"",
			phone:"",
			email:"",
			address:"",
			city:""			
		})
	}
	
	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="firstname">First Name</label>
				<input type="text"
						name="firstname"
						onChange={this.onChange}
						value={this.state.firstname}/>
				<br/>
				<label htmlFor="lastname">Last Name</label>
				<input type="text"
						name="lastname"
						onChange={this.onChange}
						value={this.state.lastname}/>
				<br/>
				<label htmlFor="phone">Phone</label>
				<input type="text"
						name="phone"
						onChange={this.onChange}
						value={this.state.phone}/>
				<br/>
				<label htmlFor="email">Email</label>
				<input type="email"
						name="email"
						onChange={this.onChange}
						value={this.state.email}/>
				<br/>
				<label htmlFor="address">Address</label>
				<input type="text"
						name="address"
						onChange={this.onChange}
						value={this.state.address}/>
				<br/>
				<label htmlFor="city">City</label>
				<input type="text"
						name="city"
						onChange={this.onChange}
						value={this.state.city}/>
				<br/>	
				<button type="submit">Add</button>
			</form>
		)
	}
	
}
export default StateManager(ContactForm);