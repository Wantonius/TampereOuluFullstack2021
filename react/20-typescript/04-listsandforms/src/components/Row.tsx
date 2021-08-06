import React from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	removeFromList(id:number):void;
}

export default class Row extends React.Component<Props> {
	
	render() {
		return (
			<tr>
				<td>{this.props.item.type}</td>
				<td>{this.props.item.count}</td>
				<td>{this.props.item.price}</td>
				<td><button onClick={() => this.props.removeFromList(this.props.item.id)}>Remove</button></td>
			</tr>
		
		)
	}
}