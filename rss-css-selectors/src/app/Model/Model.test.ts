import Model from './Model';

describe('Model.getElementMarkup', () => {
  const element = document.createElement('div');
  test('element without attributes', () => {
    element.textContent = '<tag>';
    expect(Model.getElementMarkup(element)).toBe('<tag></tag>');
  });
  test('element with className', () => {
    element.textContent = '<tag className="className"/>';
    expect(Model.getElementMarkup(element)).toBe('<tag className="className"></tag>');
  });
  test('element with child element', () => {
    element.textContent = '<tag className="className"/>';
    element.append(document.createElement('div'));
    expect(Model.getElementMarkup(element)).toBe('<tag className="className"></tag>');
    element.innerHTML = '';
  });
});

describe('Model.hightlightElements', () => {
  test('hightlightElements', () => {
    document.body.innerHTML = `<div></div><span></span>`;
    const firstElement = document.querySelector('div') as HTMLDivElement;
    const secondElement = document.querySelector('span') as HTMLSpanElement;
    Model.hightlightElements(firstElement, secondElement);

    expect(document.body.innerHTML).toBe(
      '<div class="highlighten"></div><span class="highlighten"></span>'
    );
  });
});

describe('Model.removeHightlight', () => {
  test('removeHightlight', () => {
    document.body.innerHTML = '<div class="highlighten"></div><span class="highlighten"></span>';
    const firstElement = document.querySelector('div') as HTMLDivElement;
    const secondElement = document.querySelector('span') as HTMLSpanElement;
    Model.removeHightlight(firstElement, secondElement);

    expect(document.body.innerHTML).toBe('<div class=""></div><span class=""></span>');
  });
});

describe('Model.separateElementAndMarkup', () => {
  test('separateElementAndMarkup', () => {
    const firstElement = document.createElement('div');
    firstElement.textContent = 'Test';
    const secondElement = document.createElement('span');
    expect(Model.separateElementAndMarkup(firstElement, secondElement)).toEqual([
      secondElement,
      firstElement,
    ]);
  });
});

describe('Model.changeClassName', () => {
  test('add blink class name', () => {
    document.body.innerHTML = '<form><input></form>';
    const input = document.querySelector('input') as HTMLInputElement;
    Model.changeClassName(input);
    expect(document.body.innerHTML).toBe('<form class="blink"><input></form>');
  });
  test('remove blink class name', () => {
    document.body.innerHTML = '<form class="blink"><input value="1"></form>';
    const input = document.querySelector('input') as HTMLInputElement;
    Model.changeClassName(input);
    expect(document.body.innerHTML).toBe('<form class=""><input value="1"></form>');
  });
});
