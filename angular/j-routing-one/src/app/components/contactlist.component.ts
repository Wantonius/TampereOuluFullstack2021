import {Component, OnInit} from '@angular/core';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contactservice.service';

@Component({
	selector:"contact-list",
	templateUrl:"./contactlist.component.html"
})
export class ContactList implements OnInit {
	

	contactList:Contact[] = [];
	
	constructor(private _contactService:ContactService) {}
	
	ngOnInit() {
		this.getList();
	}
	
	getList() {
		this.contactList = this._contactService.getList();
	}
	
	
	removeFromList(id:number) {
		this._contactService.removeFromList(id);
		this.getList();
	}
}