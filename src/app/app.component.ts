import { Component } from '@angular/core';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],  
  //directives: [HomeComponent, RecipeDetailComponent, DashboardComponent, RecipesComponent],
  providers: [RecipeService]
})

export class AppComponent {
 
  yell(e) {
    alert("I am yelling");
    console.log('event', e)
  }

}
