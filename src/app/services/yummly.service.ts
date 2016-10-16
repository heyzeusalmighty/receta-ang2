import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class YummlyService {

	private recipesUrl = 'http://localhost:3000/api/recipes';

	constructor(private http: Http) { 
		console.log(' yujmmmmmy ')
	}

}
