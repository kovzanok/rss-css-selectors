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
    searchedEl: 'green apple',
    markup: `
    <apple class="green"/>
    <apple />`,
    searchedSelector: '.green',
    task: {
      taskName: 'Class Selector',
      taskText: 'Select elements by their class',
      taskDescription:
        'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
      examples: `.neato selects all elements with class="neato"`,
    },
  },
];
