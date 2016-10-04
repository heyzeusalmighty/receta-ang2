import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-add-new-tag',
  templateUrl: './add-new-tag.component.html',
  styleUrls: ['./add-new-tag.component.css']
})
export class AddNewTagComponent implements OnInit {

  addingTag: boolean = false;  

  constructor(
    private recipeService: RecipeService,
    private _renderer:Renderer,
  ) { }

  ngOnInit() {
  }

  initiateAdding() : void {
    this.addingTag = true;    
  }

  addThisTag(newTagName : string) :void {
    console.log('saving ' + newTagName);
    this.addingTag = false;
    this.recipeService.addTag(newTagName);
  }

  onCompletion(newTag: string) {
    console.log('new tag name => ', newTag);   
    this.addThisTag(newTag);
  }

  onCancellation() {
    this.addingTag = false;
  }

  
}


