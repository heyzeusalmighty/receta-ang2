
const chai = require('chai');
let expect = chai.expect;

let yummlyController = require('../server/api/yummly/yummly.controller');


describe('yummly tests', () => {
	it('should run a test', () => {
		expect(2).to.equal(2);
	});

	// yummly id => Cinnamon-Toast-Martha-Stewart-191472
	// sourceUrl => "http://www.marthastewart.com/314104/cinnamon-toast"
	// getInstructions

	it('should try to scrape this martha stewart website and return a list of instructions', function(done) {
		const sourceUrl = 'http://www.marthastewart.com/314104/cinnamon-toast';

		console.log('trying to hit the controller')
		let results = yummlyController.scrapeByUrl(sourceUrl, (directions) => {
			expect(directions).to.have.length(1);
			done();
		});
	})

	it('should try to scrape myrecipes.com and return a list of instructions', (done) => {
		const sourceUrl = 'http://www.myrecipes.com/recipe/slow-cooker-carne-adovada';

		let results = yummlyController.scrapeByUrl(sourceUrl, (directions) => {
			expect(directions).to.have.length(9);
			done();
		})
	})





})