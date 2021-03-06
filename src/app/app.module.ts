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
import { MdGridListModule } from '@angular2-material/grid-list';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';


import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { recipeReducer } from './reducers/recipe.reducer';
import { tagReducer } from './reducers/tag.reducer'; 
import { AddNewTagComponent } from './add-new-tag/add-new-tag.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { IngredientEditorComponent } from './ingredient-editor/ingredient-editor.component';
import { AutofocusInputComponent } from './autofocus-input/autofocus-input.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeEffectsService } from './services/recipe-effects.service';
import { YummlyComponent } from './yummly/yummly.component';
import { DragComponent } from './drag/drag.component';
import { DraggableDirective } from './shared/draggable';


const appReducers: any = {
	recipe: recipeReducer,
	tag: tagReducer
};

@NgModule({
	declarations: [
		AppComponent,
		RecipeDetailComponent,
		DashboardComponent,
		RecipesComponent,
		RecipeViewComponent,
		AddNewTagComponent,
		TagInputComponent,
		IngredientEditorComponent,
		AutofocusInputComponent,
		RecipeSearchComponent,
		YummlyComponent,
		DragComponent,
		DraggableDirective
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
		MdGridListModule.forRoot(),
		StoreModule.provideStore(appReducers),
		EffectsModule.run(RecipeEffectsService),
		DragulaModule
	],
	providers: [],
	entryComponents: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {

}
