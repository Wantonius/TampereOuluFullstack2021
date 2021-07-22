import React from 'react';
import {Table} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';

export default class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props) 
		this.state = {
			removeIndex:-1
		}
	}
	
	changeToRemoveMode = (index) => {
		this.setState({
			removeIndex:index
		})
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1
		})
	}
	
	removeFromList = (id) => {
		this.props.removeFromList(id);
		this.cancel();
	}
	
	render() {
		let items = this.props.list.map((item,index) => {
			if(this.state.removeIndex === index) {
				return (<RemoveRow key={item.id} item={item} 
				removeFromList={this.removeFromList} cancel={this.cancel}/>)				
			}
			return (<Row key={item.id} item={item} index={index}
				changeToRemoveMode={this.changeToRemoveMode}/>)
		})
		return(
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
		)
	}
}