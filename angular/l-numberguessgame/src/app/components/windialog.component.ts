import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface DialogData {
	guesses: number
}

@Component({
	selector:"windialog",
	templateUrl:"./windialog.component.html"
})
export class WinDialog {
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}