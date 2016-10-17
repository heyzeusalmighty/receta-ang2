import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';

// import { DraggableDirective } from '../shared/draggable';

@Component({
	selector: 'app-drag',
	templateUrl: './drag.component.html',
	styleUrls: ['./drag.component.css'],
	viewProviders: [DragulaService]
})
export class DragComponent implements OnInit {

	@Output() changePosition = new EventEmitter(false);
	top: number = 200;
	left: number = 100;
	calculatedHeight : number = 800;

	// dragula stuff
	items: Array<any> = [
		{ id: 1, name: 'the FIRST'},
		{ id: 2, name: 'SECOND BEST'},
		{ id: 3, name: 'THIRD WORST'},
		{ id: 4, name: 'COME FOURTH'},
		{ id: 5, name: 'PLEAD FIFTH'},
		{ id: 6, name: 'SIXTH SENSE'},
		{ id: 7, name: 'SEVENTH HEAVEN'},
		{ id: 8, name: 'OCTO'},
	]

	constructor(private dragulaService: DragulaService) {
		dragulaService.drag.subscribe((value) => {
			console.log(`drag: ${value[0]}`);
			this.onDrag(value.slice(1));
		});
		dragulaService.drop.subscribe((value) => {
			console.log(`drop: ${value[0]}`);
			this.onDrop(value.slice(1));
		});
		dragulaService.over.subscribe((value) => {
			console.log(`over: ${value[0]}`);
			this.onOver(value.slice(1));
		});
		dragulaService.out.subscribe((value) => {
			console.log(`out: ${value[0]}`);
			this.onOut(value.slice(1));
		});
	}

	ngOnInit() {
	}

	handleChangeNotePosition(event) : void {
		console.log('event' , event);
		this.changePosition.emit(event);
	}


	private onDrag(args) {
		let [e, el] = args;
		// do something
	}

	private onDrop(args) {
		let [e, el] = args;
		// do something

		// this is the item dropped
		console.log('from drop :: e  => ', e);

		// this is the container in which it was dropped
		console.log('from drop :: el => ', el);
	}

	private onOver(args) {
		let [e, el, container] = args;
		// do something
	}

	private onOut(args) {
		let [e, el, container] = args;
		// do something
	}

}
