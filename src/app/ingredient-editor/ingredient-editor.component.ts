import { Component, OnInit, Input, Renderer, ViewChild } from '@angular/core';
import { Ingredient } from '../models/recipe';

@Component({
  selector: 'ingredient-editor',
  templateUrl: './ingredient-editor.component.html',
  styleUrls: ['./ingredient-editor.component.css']
})
export class IngredientEditorComponent implements OnInit {
  @Input() ingredientGroup : Ingredient;
  @ViewChild('groupName') titleInputElement;


  constructor(public renderer: Renderer) { }

  ngOnInit() {
    console.log('initiated => ', this.ingredientGroup);
    if(!this.ingredientGroup.title) {
      this.ingredientGroup.title = "";
    }

    if(!this.ingredientGroup.ingredients) {
      this.ingredientGroup.ingredients = [""];
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.titleInputElement._inputElement.nativeElement, 'focus', [])
		}, 0);
  }

  addIngredient():void {
    this.ingredientGroup.ingredients.push("");
  }

  deleteIngredient(index): void {
   	this.ingredientGroup.ingredients.splice(index, 1);
  }

  	checkingForEnter(event, index): void {
		if(event.keyCode === 13) {           
			if(event.target.id.includes('groupName')) {
				console.log('its the group')
			} else {
				this.addIngredient();
			}
		}
	}


}
