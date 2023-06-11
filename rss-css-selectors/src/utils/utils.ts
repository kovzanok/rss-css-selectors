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

export const getAllChildElements = (parentElement: HTMLElement): HTMLElement[] => {
  const childrenArr = Array.from(parentElement.children);
  const resArr: HTMLElement[] = [];
  childrenArr.forEach((el) => {
    if (el instanceof HTMLElement) {
      resArr.push(el);
      if (el.childElementCount !== 0) {
        resArr.push(...getAllChildElements(el));
      }
    }
  });
  return resArr;
};
