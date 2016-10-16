import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';



@Injectable()
export class YummlyService {

	private yummlyUrl = 'http://localhost:3000/api/yummly';
	

	constructor(private http: Http) { }

	searchYummly(searchTerm : string, pageNumber : number) {

		let headers		= new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options		= new RequestOptions({ headers: headers }); // Create a request option

		let searchUrl = this.yummlyUrl + '/' + searchTerm + '/' + pageNumber;

		//return Observable.of(this.dummyResponse).map(o => JSON.stringify(o));

		return this.http.get(searchUrl, options )
			.map((res: Response) => res.json());

	}




















}
