import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router'

@Component({
	selector:"secret",
	templateUrl:"./secret.component.html"
})
export class Secret implements OnInit {
	
	name:string = "";
	
	constructor(private _route:ActivatedRoute) {}

	ngOnInit() {
		this._route.queryParams.subscribe(params => {
			this.name = params['name'];
		})
	}
}