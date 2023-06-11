import { Level } from './types';

export const levels: Level[] = [
  {
    searchedEl: 'apple',
    markup: `
    <apple />
    <apple />`,
    searchedSelector: 'apple',
    task: {
      taskName: 'Type Selector',
      taskText: 'Select elements by their type',
      taskDescription:
        'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.',
      examples: `div selects all div elements.
      p selects all p elements.`,
    },
  },
  {
    searchedEl: 'oranges',
    markup: `
    <orange />
    <apple />
    <orange />`,
    searchedSelector: 'orange',
    task: {
      taskName: 'Type Selector',
      taskText: 'Select elements by their type',
      taskDescription:
        'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.',
      examples: `div selects all div elements.
      p selects all p elements.`,
    },
  },

  {
    searchedEl: 'rotten apple',
    markup: `
    <apple id="rotten"/>
    <apple />`,
    searchedSelector: '#rotten',
    task: {
      taskName: 'ID Selector',
      taskText: 'Select elements with an ID',
      taskDescription:
        'Selects the element with a specific id. You can also combine the ID selector with the type selector.',
      examples: `#cool selects any element with id="cool"
      ul#long selects ul id="long"`,
    },
  },

  {
    searchedEl: 'worm in the orange',
    markup: `
    <orange>
      <worm />
    </orange>
    <apple>
      <worm />
    </apple>
    <worm />`,
    searchedSelector: 'orange worm',
    task: {
      taskName: 'Descendant Selector',
      taskText: 'Select an element inside another element',
      taskDescription:
        'Selects all B inside of A. B is called a descendant because it is inside of another element.',
      examples: `p  strong selects all strong elements that are inside of any p`,
    },
  },
  {
    searchedEl: 'worm in the rotten apple',
    markup: `
    <orange>
      <worm />
    </orange>
    <apple id="rotten">
      <worm />
    </apple>
    <worm />`,
    searchedSelector: '#rotten worm',
    task: {
      taskName: '',
      taskText: 'Combine the Descendant & ID Selectors',
      taskDescription: 'You can combine any selector with the descendent selector.',
      examples: `#cool span selects all span elements that are inside of elements with id="cool"`,
    },
  },
  {
    searchedEl: 'small apple',
    markup: `
    <apple class="small"/>
    <apple />`,
    searchedSelector: '.small',
    task: {
      taskName: 'Class Selector',
      taskText: 'Select elements by their class',
      taskDescription:
        'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
      examples: `.neato selects all elements with class="neato"`,
    },
  },
  {
    searchedEl: 'small apple',
    markup: `
    
    <apple >
      <worm class="small"/>
    </apple>
    <apple class="small" />
    <orange class="small" />`,
    searchedSelector: 'apple.small',
    task: {
      taskName: '',
      taskText: 'Combine the Class Selector',
      taskDescription:
        'You can combine the class selector with other selectors, like the type selector.',
      examples: `ul.important selects all ul elements that have class="important"
      #big.wide selects all elements with id="big" that also have class="wide"`,
    },
  },
];
