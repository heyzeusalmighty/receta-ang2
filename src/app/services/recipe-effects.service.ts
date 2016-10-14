import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeDataService } from './recipe-data.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects'

@Injectable()
export class RecipeEffectsService {

  constructor(private http: Http, private actions$: Actions) {}
  

}
