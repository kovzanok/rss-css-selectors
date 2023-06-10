export function getElementAttribute(elementMarkup: string, attributeName: string): string {
  const attributeIndex = elementMarkup.indexOf(`${attributeName}="`) + attributeName.length + 2;

  const attribute = elementMarkup.slice(attributeIndex, elementMarkup.indexOf('"', attributeIndex));

  return attribute;
}

type splitMarkupStringFunction = (markup: string) => string[];

export const splitMarkupString: splitMarkupStringFunction = (markup) => {
  return markup
    .split('\n')
    .slice(1)
    .map((el) => el.trim());
};

type findElementIndexFunction = (element: HTMLElement, elementList: HTMLCollection) => number;

export const findElementIndex: findElementIndexFunction = (element, elementList) => {
  const elements = Array.from(elementList);
  const index = elements.findIndex((el) => el === element);
  return index;
};
