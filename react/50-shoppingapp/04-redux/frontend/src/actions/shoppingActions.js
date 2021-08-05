import {loading,stopLoading,clearLoginState} from './loginActions';

//ACTION CONSTANTS

export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILED = "ADD_ITEM_FAILED";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILED = "REMOVE_ITEM_FAILED";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED";
export const CLEAR_SHOPPING_STATE = "CLEAR_SHOPPING_STATE";

//ASYNC ACTIONS

export const getList = (token,search,price) => {
	return (dispatch) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":token}
		}
		let url = "/api/shopping"
		if(search) {
			url = url + "?type="+search;
			if(price) {
				url = url + "&price="+price;
			}
		}
		dispatch(loading());
		fetch(url,request).then(response => {
			dispatch(stopLoading());
			if(response.ok) {
				response.json().then(data => {
					dispatch(fetchListSuccess(data));
				}).catch(error => {
					dispatch(fetchListFailed("Error!! Failed to parse shopping information."))
				})
			} else {
				if(response.status === 403) {
					dispatch(clearLoginState());
					dispatch(clearShoppingState());
					dispatch(fetchListFailed("Session expired! Logging you out!"));
				} else {
					dispatch(fetchListFailed("Fetching information failed! Server responded with a status:"+response.statusText));
				}
			}
		}).catch(error => {
			dispatch(stopLoading());
			dispatch(fetchListFailed("Fetching information failed! There was an error:"+error));
		});
	}
}	

//ACTION CREATORS

export const fetchListSuccess = (list) => {
	return {
		type:FETCH_LIST_SUCCESS,
		list:list
	}
}

export const fetchListFailed = (error) => {
	return {
		type:FETCH_LIST_FAILED,
		error:error
	}
}

export const addItemSuccess = () => {
	return {
		type:ADD_ITEM_SUCCESS
	}
}

export const addItemFailed = (error) => {
	return {
		type:ADD_ITEM_FAILED,
		error:error
	}
}

export const removeItemSuccess = () => {
	return {
		type:REMOVE_ITEM_SUCCESS
	}
}

export const removeItemFailed = (error) => {
	return {
		type:REMOVE_ITEM_FAILED,
		error:error
	}
}

export const editItemSuccess = () => {
	return {
		type:EDIT_ITEM_SUCCESS
	}
}

export const editItemFailed = (error) => {
	return {
		type:EDIT_ITEM_FAILED,
		error:error
	}
}

export const clearShoppingState = () => {
	return {
		type:CLEAR_SHOPPING_STATE
	}
}