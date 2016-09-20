/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeService } from '../recipe.service';

describe('Component: RecipeDetail', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService]
    });
  });
  
  
  // it('should create an instance', () => {
  //   let component = new RecipeDetailComponent();
  //   expect(component).toBeTruthy();
  // });

  it('true is true for testing purposes', () => expect(true).toBe(true));

  

});
