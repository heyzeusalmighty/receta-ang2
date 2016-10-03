import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-add-new-tag',
  templateUrl: './add-new-tag.component.html',
  styleUrls: ['./add-new-tag.component.css']
})
export class AddNewTagComponent implements OnInit {

  newTagName: string = "";
  addingTag: boolean = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  addThisTag() :void {
    console.log('saving ' + this.newTagName);
    this.addingTag = false;
    this.recipeService.addTag(this.newTagName);
  }

  checkingForEnter(event, index): void {
		//keycode of the enter key is 13 btw
		if(event.keyCode === 13) {
      this.addThisTag();
		}
	}

}
