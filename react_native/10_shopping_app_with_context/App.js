import StateProvider from './context/StateProvider';
import React,{useEffect} from 'react';
import useAppState from './hooks/useAppState';
import useAction from './hooks/useAction';
import Container from './components/Container';

export default function App() {
	
	const {isLogged,token} = useAppState();
	const {getList} = useAction();
	
	useEffect(() => {
		if(isLogged) {
			getList(token);
		}
	},[isLogged])
	
	return (
		<StateProvider>
			<Container/>
		</StateProvider>
	);
}

