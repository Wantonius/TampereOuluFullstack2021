import { Component } from '@angular/core';
import {ObservableService} from './observableservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	message:string = "";
  
	constructor(private _obs:ObservableService) {}

	startObserving() {
		this._obs.getObservable().subscribe(
			value => { this.message = "Observable value:"+value},
			error => { this.message = "Error occured:"+error},
			() => {this.message = "Completed"}
		)
	}
}
