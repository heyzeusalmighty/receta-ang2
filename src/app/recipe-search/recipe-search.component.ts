import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'recipe-search',
	templateUrl: './recipe-search.component.html',
	styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {

	searchingFlag : boolean = false;
	searchString : string = "";
	constructor() { }

	ngOnInit() {
	}

	checkBlur() :void {
		console.info('checking blur');
		if(this.searchString.length === 0 ) {
			this.searchingFlag = false;
		}
	}

	query(): void {
		console.log('querying with ', this.searchString)
	}

}
