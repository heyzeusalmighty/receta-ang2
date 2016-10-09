import { Component, OnInit, Input, Output, Renderer, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autofocus-input',
  template: `
        <md-input #autoInput placeholder="Ingredient" [(ngModel)]="itemForInput" (keypress)="checkingForEnter($event, i)"></md-input>`,
  //styleUrls: ['./autofocus-input.component.css']
})
export class AutofocusInputComponent implements OnInit {

  @Input() itemForInput : string;
  @Output() onCompletion = new EventEmitter();
  @ViewChild('autoInput') inputElementRef;


  constructor(public renderer : Renderer) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
		setTimeout(() => {
			this.renderer.invokeElementMethod(this.inputElementRef._inputElement.nativeElement, 'focus', [])
		}, 0);
	}

	checkingForEnter(event, index): void {
		//keycode of the enter key is 13 btw
		if(event.keyCode === 13) {
            //this.addThisTag();
                  this.onCompletion.emit();
		}
	}


}
