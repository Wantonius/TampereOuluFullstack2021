import useAction from '../hooks/useaction';
import useAppState from '../hooks/useappstate';
import {useEffect} from 'react';

const ShoppingList = (props) => {
	
	const {fetchList,remove} = useAction();
	const state = useAppState();
	
	useEffect(() => {
		if(state.isLogged) {
			fetchList(state.token);
		}
	},[])
	
	let items = state.list.map((item) => {
		return (
			<tr key={item.id}>
				<td>{item.type}</td>
				<td>{item.count}</td>
				<td>{item.price}</td>
				<td><button onClick={() => remove(state.token,item.id)}>Remove</button></td>
			</tr>
		)
	})
	return(
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

export default ShoppingList;