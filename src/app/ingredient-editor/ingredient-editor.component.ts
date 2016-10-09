import { Component, OnInit, Input, Output, Renderer, ViewChild, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/recipe';

@Component({
  selector: 'ingredient-editor',
  templateUrl: './ingredient-editor.component.html',
  styleUrls: ['./ingredient-editor.component.css']
})
export class IngredientEditorComponent implements OnInit {
  @Input() ingredientGroup : Ingredient;
  @Output() onDeletion = new EventEmitter();
  @ViewChild('groupName') titleInputElement;


  constructor(public renderer: Renderer) { }

  ngOnInit() {
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

  deleteGroup() : void {
    this.onDeletion.emit();
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
