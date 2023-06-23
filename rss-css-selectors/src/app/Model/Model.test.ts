import Model from "./Model";

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