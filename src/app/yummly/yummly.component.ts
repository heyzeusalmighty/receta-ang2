import { Component, OnInit } from '@angular/core';

import { YummlyService } from '../services/yummly.service';

@Component({
	selector: 'app-yummly',
	templateUrl: './yummly.component.html',
	styleUrls: ['./yummly.component.css']
})
export class YummlyComponent implements OnInit {

	searchTerm: string;

	constructor(private yumService : YummlyService) { }

	ngOnInit() {

	}




	checkingForEnter(event, index): void {
		//keycode of the enter key is 13 btw
		if(event.keyCode === 13) {
			//this.addThisTag();
			console.log('enter')

		}
	}

}
