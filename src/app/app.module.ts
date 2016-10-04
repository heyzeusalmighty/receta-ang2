import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdMenuModule } from '@angular2-material/menu';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdIconModule } from '@angular2-material/icon';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { Store, StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { counterReducer } from './reducers/counter';
import { recipeReducer } from './reducers/recipe.reducer';
import { AddNewTagComponent } from './add-new-tag/add-new-tag.component';
import { AutofocusInputComponent } from './autofocus-input/autofocus-input.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailComponent,
    DashboardComponent,
    RecipesComponent,
    RecipeViewComponent,
    AddNewTagComponent,
    AutofocusInputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    MdButtonModule.forRoot(),
    MdCardModule.forRoot(),
    MdMenuModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdIconModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdInputModule.forRoot(),
    MdListModule.forRoot(),
    StoreModule.provideStore({ counter: counterReducer }, { counter: 0 }),
    StoreModule.provideStore({ recipe: recipeReducer}),
    //StoreModule.provideStore({ tag: tagReducer })
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
