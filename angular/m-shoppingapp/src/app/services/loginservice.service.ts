import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {BackendMessage} from '../models/backendmessage.model';

@Injectable()
export class LoginService {
	private token:string = "";
	private isLogged:boolean = false;
	
	constructor(private _http:HttpClient) {
		let temp = sessionStorage.getItem("logininfo")
		if(temp) {
			let info = JSON.parse(temp);
			this.isLogged = info.isLogged;
			this.token = info.token;				
		}		
	}
	
	register(username:string,password:string) {
		const user = {
			"username":username,
			"password":password
		}
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-type":"application/json"
			})
		}
		return this._http.post<BackendMessage>("/register",user,httpOptions);
	}

	login(username:string,password:string) {
		const user = {
			"username":username,
			"password":password
		}
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-type":"application/json"
			})
		}
		return this._http.post<BackendMessage>("/login",user,httpOptions);
	}

	logout() {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-type":"application/json",
				"token":this.token
			})
		}
		return this._http.post<BackendMessage>("/logout",{},httpOptions);
	}

	getToken() {
		return this.token;
	}
	
	isUserLogged() {
		return this.isLogged;
	}
	
	setLoginState(login:boolean,token:string) {
		this.token = token;
		this.isLogged = login;
		sessionStorage.setItem("logininfo",JSON.stringify({
			isLogged:this.isLogged,
			token:this.token
		}))
	}
}