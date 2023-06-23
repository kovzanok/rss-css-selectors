import { splitMarkupString, findElementIndex } from './utils';

describe('splitMarkupString', () => {
  test('remove first empty array element', () => {
    const markup = `
    <element/>
    <element/>`;
    expect(splitMarkupString(markup)).toEqual(['<element/>', '<element/>']);
  });
  test('remove last empty array element', () => {
    const markup = `<element/>
    <element/>
    `;
    expect(splitMarkupString(markup)).toEqual(['<element/>', '<element/>']);
  });
  test('remove all empty array elements', () => {
    const markup = `
    <element/>
    <element/>
    `;
    expect(splitMarkupString(markup)).toEqual(['<element/>', '<element/>']);
  });
  test('split nested elements', () => {
    const markup = `
    <element>
      <nested-el/>
    </element>
    <element/>
    `;
    expect(splitMarkupString(markup)).toEqual([
      '<element>',
      '<nested-el/>',
      '</element>',
      '<element/>',
    ]);
  });
});

describe('findElementIndex', () => {
  const elementIndexToSearch = [2, 6, 1, 7];
  const list = new Array(10).fill(0).map((_, index) => {
    const element = document.createElement('tag');
    element.id = String(index);
    return element;
  });

  function makeTest(index: number) {
    const expected = index;
    const element = list[index];
    test(`find element by index ${index}`, () => {
      expect(findElementIndex(element, list)).toBe(expected);
    });
  }

  for (const index of elementIndexToSearch) {
    makeTest(index);
  }
});
