import Controller from '../app/Controller';
import Model from '../app/Model';
import { ElementCreationParams } from '../types';

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

export const removeElement = (el: HTMLElement, callback: () => void): void => {
  el.classList.add('clean');
  el.onanimationend = () => {
    el.classList.remove('clean');
    callback();
  };
};

export const createElement = <T extends HTMLElement>(params: ElementCreationParams): T => {
  const element = document.createElement(params.tag) as T;
  if (params.className) {
    element.className = params.className;
  }

  if (params.disabled) {
    element.setAttribute('disabled', '');
  }

  if (params.attributes) {
    for (const [key, value] of Object.entries(params.attributes)) {
      element.setAttribute(key, value);
    }
  }
  if (params.textContent) {
    element.textContent = params.textContent;
  }
  if (params.eventHandlers) {
    for (const [key, value] of Object.entries(params.eventHandlers)) {
      element.addEventListener(key, value);
    }
  }
  return element;
};

export const renderNestedElements = (markupArr: string[], parentElement: HTMLElement): void => {
  let wrapper = '';
  let isNestedEl = false;

  markupArr.forEach((el) => {
    if (isNestedEl) {
      if (el.includes('/>')) {
        // check close tag of markupWrapperElement children
        wrapper += el;
        return;
      } else if (el.includes('</')) {
        // check markupWrapperElement close tag
        isNestedEl = false;
        wrapper += el;
        parentElement.innerHTML += wrapper;
        return;
      }
    }

    if (!el.includes('</') && !el.includes('/>')) {
      // check if tag contains closing slash
      isNestedEl = true;
      wrapper = el;
    } else {
      wrapper = el;
      parentElement.innerHTML += wrapper;
    }
  });
};

export const introduceModelAndController = (model: Model, controller: Controller) => {
  model.setController(controller);
  controller.setModel(model);
};
