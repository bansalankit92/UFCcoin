import { UnitechainPage } from './app.po';

describe('unitechain App', () => {
  let page: UnitechainPage;

  beforeEach(() => {
    page = new UnitechainPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
