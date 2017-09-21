import { StRequestQuoteUiPage } from './app.po';

describe('st-request-quote-ui App', () => {
  let page: StRequestQuoteUiPage;

  beforeEach(() => {
    page = new StRequestQuoteUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
