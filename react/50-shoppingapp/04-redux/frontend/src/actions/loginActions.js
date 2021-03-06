import {getList,clearShoppingState} from './shoppingActions';

//ACTION CONSTANTS

export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";

//ASYNC ACTIONS
export const register = (user) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		let response = await fetch("/register",request).catch(error => {
			console.log("There was an error:"+error)
		});
		if(!response) {
			dispatch(registerFailed("There was an error with the connection. Register failed!"));
			return;
		}
		if(response.ok) {
			dispatch(registerSuccess());
		} else {
			if(response.status === 409) {
				dispatch(registerFailed("Username is already in use"))
			} else {
			 dispatch(registerFailed("Register failed. Server responded with a status:"+response.status))
			}
		}
	}
}

	
export const login = (user) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		let response = await fetch("/login",request).catch(error => {
			console.log("There was an error:"+error)
		});
		if(!response) {
			dispatch(loginFailed("There was an error in the connection. Login failed!"));
			return;
		}
		if(response.ok) {
			let data = await response.json().catch(error => {
				console.log("Error parsing json:"+error);
			});
			if(!data) {
				dispatch(loginFailed("Failed to parse login information. Login failed!"))
				return;
			}
			dispatch(loginSuccess(data.token));
			dispatch(getList(data.token));
		} else {
			dispatch(loginFailed("Login failed. Server responded with a status:"+response.statusText));
		}			
	}
}	


export const logout = (token) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					"token":token}
		}
		dispatch(loading());
		let response = await fetch("/logout",request).catch(error => {
			console.log("There was an error");
		})
		if(!response) {
			dispatch(logoutFailed("There was an error. Logging you out!"))
			dispatch(clearShoppingState());
			return;
		}
		if(response.ok) {
			dispatch(logoutSuccess());
			dispatch(clearShoppingState());
		} else {
			dispatch(logoutFailed("Logging you out. Server responded with a status:"+response.statusText))
			dispatch(clearShoppingState());
		}
	}
}
//ACTION CREATORS

export const loading = () => {
	return {
		type:LOADING
	}
}

export const stopLoading = () => {
	return {
		type:STOP_LOADING
	}
}

export const registerSuccess = () => {
	return {
		type:REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}

export const loginSuccess = (token) => {
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}

export const loginFailed = (error) => {
	return {
		type:LOGIN_FAILED,
		error:error
	}
}

export const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED,
		error:error
	}
}

export const clearLoginState = () => {
	return {
		type:CLEAR_LOGIN_STATE
	}
}