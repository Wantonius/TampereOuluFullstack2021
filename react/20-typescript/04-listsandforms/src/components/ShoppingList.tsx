import React from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';

interface Props {
	list:ShoppingItem[];
	removeFromList(id:number):void;
}

export default class ShoppingList extends React.Component<Props> {
	
	render() {
		let items = this.props.list.map((item) => {
			return (
				<Row key={item.id} item={item} removeFromList={this.props.removeFromList}/>
				)
		})
		return (
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Count</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
				{items}
				</tbody>
			</table>
		)
	}
}
