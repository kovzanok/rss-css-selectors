import { splitMarkupString } from './utils';


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
