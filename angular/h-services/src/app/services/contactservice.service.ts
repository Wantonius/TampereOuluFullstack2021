import {Injectable} from '@angular/core';
import {Contact} from '../models/contact.model';

@Injectable()
export class ContactService {
	
	private contactList:Contact[] = [];
	private id:number = 100;
	
	getList() {
		return this.contactList;
	}
	
	addToList(contact:Contact) {
		contact.id = this.id;
		this.id++;
		this.contactList.push(contact);
	}
	
	removeFromList(id:number) {
		let templist = this.contactList.filter(item => item.id !== id)
		this.contactList = tempList;
	}
}