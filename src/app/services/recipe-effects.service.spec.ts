/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipeEffectsService } from './recipe-effects.service';

describe('Service: RecipeEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeEffectsService]
    });
  });

  it('should ...', inject([RecipeEffectsService], (service: RecipeEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
