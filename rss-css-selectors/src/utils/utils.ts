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

export const renderNestedMarkup = (
  markupArr: string[],
  renderElFunction: (el: string) => HTMLElement
): HTMLElement[] => {
  const res: HTMLElement[] = [];
  let markupWrapperElement: HTMLElement;
  let isNestedElement = false; //predicate indicates if markupWrapperElement has child elements

  markupArr.forEach((el) => {
    if (isNestedElement) {
      if (el.includes('/>')) {
        // check close tag of markupWrapperElement children
        markupWrapperElement.append(renderElFunction(el));
        return;
      } else if (el.includes('</')) {
        // check markupWrapperElement close tag
        isNestedElement = false;
        markupWrapperElement.append(el);
        res.push(markupWrapperElement);
        return;
      }
    }

    if (!el.includes('</') && !el.includes('/>')) {
      // check if tag contains closing slash
      isNestedElement = true;
      markupWrapperElement = renderElFunction(el);
    } else {
      markupWrapperElement = renderElFunction(el);
      res.push(markupWrapperElement);
    }
  });
  return res;
};

export const shakeElement = (el: HTMLElement): void => {
  el.classList.add('shake');
  el.onanimationend = () => {
    el.classList.remove('shake');
  };
};
