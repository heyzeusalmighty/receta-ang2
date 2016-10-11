import { Component, OnInit, Input, Output, Renderer, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autofocus-input',
  //host: { '[placeholder]': 'placeholderText'},
  template: `
        <md-input #autoInput placeholder="{{placeholderText}}" [(ngModel)]="itemForInput" (keypress)="checkingForEnter($event, i)" (blur)="elementBlur()"></md-input>`,
  //styleUrls: ['./autofocus-input.component.css']
})
export class AutofocusInputComponent implements OnInit {

  @Input() itemForInput : string;
  @Input() placeholderText : string;
  @Output() onCompletion = new EventEmitter();
  @Output() onBlur = new EventEmitter();
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

	elementBlur() : void {
		this.onBlur.emit();
	}


}
