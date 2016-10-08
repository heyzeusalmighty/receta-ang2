

export class Recipe {
    _id: string;
    recipeName: string;
    description: string;
    servingSize: string;
    //ingredients: [{ title: string; ingredients: string[];}];
    ingredients: Ingredient[];
    instructions: Instruction[];
    tags: number[];
    imageUrl: string;
    source: string;
    sourceUrl: string;
    yummlyId: string;
}


export class Ingredient {
    title: string;
    ingredients: string[];

    Ingredient() {
        this.title = "";
        this.ingredients = [""];
    }
}

export class Instruction {
    id: number;
    instruction: string;

    constructor(newId: number) {
        this.instruction = "";
        this.id = newId;
    }
    // Instruction(newId: number) {
    //     this.instruction = "";
    //     this.id = newId;
    // }
}

// ingredients: [{
//         title : String,
//         ingredients: [String]
//     }],
//     instructions: [{
//         id: Number,
//         instruction: String
//     }],

