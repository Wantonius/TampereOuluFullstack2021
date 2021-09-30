import {Component,OnInit} from '@angular/core';
import {LoginService} from '../services/loginservice.service'
import {Router} from '@angular/router'

@Component({
	selector:"loginpage",
	templateUrl:"./loginpage.component.html"
})
export class LoginPage implements OnInit {
	
	username:string = "";
	password:string = "";
	message:string = "";
	
	constructor(private _login:LoginService, private _router:Router) {}
	
	ngOnInit() {
		if(this._login.isUserLogged()) {
			this._router.navigate(['/list'])
		}
	} 
	
	register() {
		this._login.register(this.username,this.password).subscribe(
			(data) => this.message = data.message,
			(error) => this.message = error.message,
			() => console.log("Register complete")
		);
	}
	
	login() {
		this._login.login(this.username,this.password).subscribe(
			data => {
				this.message = "Login success";
				this._login.setLoginState(true,data.token);
				this._router.navigate(['/list'])
			},
			error => this.message = error.message,
			() => console.log("Login complete")
		)
	}
}