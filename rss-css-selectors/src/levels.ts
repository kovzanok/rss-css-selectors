import { Level } from './types';

export const levels: Level[] = [
  {
    searchedEl: 'necklace',
    markup: `
    <necklace />
    <necklace />`,
    searchedSelector: 'necklace',
    task: {
      taskName: 'Type Selector',
      taskText: 'Select elements by their type',
      taskDescription:
        'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
      examples: [
        '<strong>div</strong> selects all <tag>div</tag> elements.',
        '<strong>p</strong> selects all <tag>p</tag> elements.',
      ],
    },
  },
  {
    searchedEl: 'rings',
    markup: `
    <ring />
    <necklace />
    <ring />`,
    searchedSelector: 'ring ',
    task: {
      taskName: 'Type Selector',
      taskText: 'Select elements by their type',
      taskDescription:
        'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.',
      examples: [
        '<strong>div</strong> selects all <tag>div</tag> elements.',
        '<strong>p</strong> selects all <tag>p</tag> elements.',
      ],
    },
  },

  {
    searchedEl: 'empire necklace',
    markup: `
    <necklace id="empire"/>
    <necklace />`,
    searchedSelector: '#empire',
    task: {
      taskName: 'ID Selector',
      taskText: 'Select elements with an ID',
      taskDescription:
        'Selects the element with a specific id. You can also combine the ID selector with the type selector.',
      examples: [
        '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
        '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
      ],
    },
  },

  {
    searchedEl: 'ruby in necklace',
    markup: `
    <ring>
      <ruby />
    </ring>
    <necklace>
      <ruby />
    </necklace>
    <ruby />`,
    searchedSelector: 'necklace ruby',
    task: {
      taskName: 'Descendant Selector',
      taskText: 'Select an element inside another element',
      taskDescription:
        'Selects all B inside of A. B is called a descendant because it is inside of another element.',
      examples: [
        '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
        '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
      ],
    },
  },
  {
    searchedEl: 'gold necklace',
    markup: `
    <necklace />
    <necklace class="gold"/>
    <necklace />`,
    searchedSelector: '.gold',
    task: {
      taskName: 'Class Selector',
      taskText: 'Select elements by their class',
      taskDescription:
        'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
      examples: [
        '<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>',
      ],
    },
  },
  {
    searchedEl: 'gold ring',
    markup: `
    <necklace class="gold" />
    <ring class="gold" />
    <necklace class="gold" />`,
    searchedSelector: 'ring.gold',
    task: {
      taskName: '',
      taskText: 'Combine the Class Selector',
      taskDescription:
        'You can combine the class selector with other selectors, like the type selector.',
      examples: [
        '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
        '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
      ],
    },
  },
];
