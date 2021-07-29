import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

export default class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props) 
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			search:"",
			price:0
		}
	}
	
	onChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}
	
	searchByType = () => {
		if(this.state.price) {		
			this.props.getList(this.state.search,this.state.price);
		} else {
			this.props.getList(this.state.search)	
		}	
		this.setState({
			search:"",
			price:0
		})
	}
	
	changeToRemoveMode = (index) => {
		this.setState({
			removeIndex:index,
			editIndex:-1
		})
	}

	changeToEditMode = (index) => {
		this.setState({
			removeIndex:-1,
			editIndex:index
		})
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	removeFromList = (id) => {
		this.props.removeFromList(id);
		this.cancel();
	}
	
	editItem = (item) => {
		this.props.editItem(item);
		this.cancel();
	}
	
	render() {
		let items = this.props.list.map((item,index) => {
			if(this.state.removeIndex === index) {
				return (<RemoveRow key={item._id} item={item} 
				removeFromList={this.removeFromList} cancel={this.cancel}/>)				
			}
			if(this.state.editIndex === index) {
				return (<EditRow key={item._id} item={item}
				editItem={this.editItem} cancel={this.cancel}/>)
			}
			return (<Row key={item._id} item={item} index={index}
				changeToRemoveMode={this.changeToRemoveMode}
				changeToEditMode={this.changeToEditMode}/>)
		})
		return(
		<div>
			<label htmlFor="search">Search by type:</label>
			<input type="text"
					name="search"
					onChange={this.onChange}
					value={this.state.search}/>
			<label htmlFor="price">Costing maximum of:</label>
			<input type="number"
					name="price"
					step="0.01"
					onChange={this.onChange}
					value={this.state.price}/>
			<Button onClick={this.searchByType} style={{marginLeft:10}}>Search</Button>
			<Table striped>
				<Table.Header>
					<Table.HeaderCell>Item type</Table.HeaderCell>
					<Table.HeaderCell>Count</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
					<Table.HeaderCell>Remove</Table.HeaderCell>
					<Table.HeaderCell>Edit</Table.HeaderCell>
				</Table.Header>
				<Table.Body>
				{items}
				</Table.Body>
			</Table>
		</div>
		)
	}
}