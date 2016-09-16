import { RecetaPage } from './app.po';

describe('receta App', function() {
  let page: RecetaPage;

  beforeEach(() => {
    page = new RecetaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
