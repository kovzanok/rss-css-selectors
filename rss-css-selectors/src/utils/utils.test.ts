import { splitMarkupString, findElementIndex, getAllChildElements } from './utils';

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

describe('getAllChildElements', () => {
  const parentElement = document.createElement('div');
  parentElement.innerHTML = `
    <ul>
      <li>
        <a/>
      </li>
      <li>
        <span></span>
      </li>
    </ul>
    <div></div>
  `;

  test('element with depth=1', () => {
    const parentElement = document.createElement('ul');
    const children: HTMLElement[] = [];
    for (let i = 0; i < 5; i++) {
      children.push(document.createElement('li'));
    }
    parentElement.append(...children);
    expect(getAllChildElements(parentElement)).toEqual(children);
  });

  test('element with nested children', () => {
    const parentElement = document.createElement('ul');
    const resultArr: HTMLElement[] = [];
    const children: HTMLElement[] = [];
    for (let i = 0; i < 5; i++) {
      const el = document.createElement('li');
      resultArr.push(el);
      if (i % 2 === 0) {
        const link = document.createElement('a');
        resultArr.push(link);
        el.append(link);
      }
      children.push(el);
    }
    parentElement.append(...children);
    expect(getAllChildElements(parentElement)).toEqual(resultArr);
  });
});

