import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { YummlyService } from '../services/yummly.service';

@Component({
	selector: 'app-yummly',
	templateUrl: './yummly.component.html',
	styleUrls: ['./yummly.component.css']
})
export class YummlyComponent implements OnInit {

	searchTerm: string = 'cinnamon';
	pageNumber: number = 0;
	searchResults: Observable<any>;

	constructor(private yumService : YummlyService) { }

	ngOnInit() {

	}




	checkingForEnter(event, index): void {
		//keycode of the enter key is 13 btw
		if(event.keyCode === 13) {
			console.log('enter')
			this.searchYummly();
		}
	}

	searchYummly() : void {
		console.info('searching for ', this.searchTerm);
		this.yumService.searchYummly(this.searchTerm, this.pageNumber)
			.subscribe(
				data => this.searchResults = data
			);
	}

}
