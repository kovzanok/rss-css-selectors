type splitMarkupStringFunction = (markup: string) => string[];

export const splitMarkupString: splitMarkupStringFunction = (markup) => {
  return markup
    .split('\n')
    .slice(1)
    .map((el) => el.trim());
};

type findElementIndexFunction = (element: HTMLElement, elementList: HTMLElement[]) => number;

export const findElementIndex: findElementIndexFunction = (element, elementList) => {
  const index = elementList.findIndex((el) => el === element);
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
