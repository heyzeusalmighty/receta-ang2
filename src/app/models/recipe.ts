

export class Recipe {
	_id: string;
	recipeName: string;
	description: string;
	servingSize: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
	tags: string[];
	imageUrl: string;
	source: string;
	sourceUrl: string;
	yummlyId: string;    

	constructor() {
		this.yummlyId = '';
		this.source = '';
		this.sourceUrl = '';
		this.imageUrl = '';
		this.recipeName = '';
		this.description = '';
		this.servingSize = '';
		this.ingredients = [];
		this.instructions = [];
		this.tags = [];
	}
}


export class Ingredient {
	title: string;
	ingredients: string[];

	// not overloaded but handles emptiness
	constructor(title?: string, ings?: string[]) {
		this.title = title || '';
		this.ingredients = ings || [''];
	}
}

export class Instruction {
	id: number;
	instruction: string;

	constructor(newId: number) {
		this.instruction = '';
		this.id = newId;
	}
}

