import { IntkTicpMngProjPage } from './app.po';

describe('intk-ticp-mng-proj App', function() {
  let page: IntkTicpMngProjPage;

  beforeEach(() => {
    page = new IntkTicpMngProjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
