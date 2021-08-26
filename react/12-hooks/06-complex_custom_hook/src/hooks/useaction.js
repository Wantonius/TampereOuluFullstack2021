import {useContext,useEffect,useState,useMemo} from 'react';
import ReducerContext from './context/ReducerContext';
import {ActionConstants} from './actionconstants';

const useAction = () => {
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const dispatch = useContext(ReducerContext);
	
	if(!dispatch) {
		console.log("Needs to be under the StateProvider");
	}
	
	useEffect(() => {
		if(urlRequest.url === "") {
			return;
		}
		const fetchData = async () => {
			dispatch(ActionConstants.LOADING);
			const response = await fetch(urlRequest.url,urlRequest.request);
			dispatch(ActionConstants.STOP_LOADING);
			if(response.ok) {
				if(urlRequest.action === "register") {
					dispatch({
						type:ActionConstants.REGISTER_SUCCESS
					})
					return;
				}
				if(urlRequest.action === "login") {
					const data = await response.json();
					dispatch({
						type:ActionConstants.LOGIN_SUCCESS,
						token:data.token
					})
					return;
				}
			} else {
				
			}
		}
		
		fetchData();
	},[urlRequest]);
	
}

export default useAction;