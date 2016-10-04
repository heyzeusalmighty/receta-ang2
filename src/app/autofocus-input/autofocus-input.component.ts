import { Component, OnInit, Renderer, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-autofocus-input',
	template: `
		<button md-raised-button color="primary" (click)="addThisTag()" style="margin-bottom: 10px">Save</button>
		<button md-raised-button color="accent" (click)="cancel()" class="ing-button">Cancel</button>
		<md-input #tagInput placeholder="Tag Name" [(ngModel)]="newTagName" class="full-width" (keypress)="checkingForEnter($event, i)"></md-input>
	`,	
})
export class AutofocusInputComponent implements OnInit {

	@ViewChild('tagInput') inputElementRef;
	@Output() onCompletion = new EventEmitter<string>();
	@Output() onCancellation = new EventEmitter();
	newTagName: string = '';

	constructor(public renderer: Renderer) { }

	ngOnInit() {}

	ngAfterViewInit() {
		setTimeout(() => {
			this.renderer.invokeElementMethod(this.inputElementRef._inputElement.nativeElement, 'focus', [])
		}, 0);
	}

	checkingForEnter(event, index): void {
		//keycode of the enter key is 13 btw
		if(event.keyCode === 13) {
            this.addThisTag();
		}
	}

    addThisTag() {
        if(this.newTagName.length > 0) {
			this.onCompletion.emit(this.newTagName);
		}
    }

	cancel() {
		this.onCancellation.emit();
	}

}
