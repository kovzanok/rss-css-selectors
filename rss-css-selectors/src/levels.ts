import { Level } from './types';

export const levels: Level[] = [
  {
    searchedEl: 'necklace',
    markup: `
    <necklace />
    <necklace />`,
    searchedSelector: 'necklace',
    levelName: 'Select elements by their type',
  },
  {
    searchedEl: 'rings',
    markup: `
    <ring />
    <necklace />
    <ring />`,
    searchedSelector: 'ring ',
    levelName: 'Select elements by their type',
  },

  {
    searchedEl: 'empire necklace',
    markup: `
    <necklace id="empire"/>
    <necklace />`,
    searchedSelector: '#empire',
    levelName: 'Select elements with an ID',
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
    levelName: 'Select an element inside another element',
  },
  {
    searchedEl: 'gold necklace',
    markup: `
    <necklace />
    <necklace class="gold"/>
    <necklace />`,
    searchedSelector: '.gold',
    levelName: 'Select elements by their class',
  },
  {
    searchedEl: 'gold ring',
    markup: `
    <necklace class="gold" />
    <ring class="gold" />
    <necklace class="gold" />`,
    searchedSelector: 'ring.gold',
    levelName: 'Combine the Class Selector',
  },
  {
    searchedEl: 'all rings and necklaces',
    markup: `
    <sapphire/>
    <ring class="gold">
      <sapphire />
    </ring>
    <necklace>
      <ruby />
    </necklace>
    <necklace class="gold" />
    <sapphire/>`,
    searchedSelector: 'ring,necklace',
    levelName: 'Combine selectors with commas',
  },
  {
    searchedEl: 'all the things',
    markup: `
    <sapphire />
    <ring class="gold"/>
    <ruby />
    <necklace class="gold"/>
    `,
    searchedSelector: '*',
    levelName: 'Select everything',
  },
  {
    searchedEl: 'all gems in necklaces',
    markup: `
    <sapphire />
    <necklace>
      <ruby />
    </necklace>
    <necklace class="gold">
      <sapphire />
    </necklace>
    <ruby /> 
    `,
    searchedSelector: 'necklace *',
    levelName: 'Combine the Universal Selector',
  },
  {
    searchedEl: "every ruby that's next to necklace",
    markup: `
    <ruby />
    <necklace>
      <ruby />
    </necklace>
    <ruby />
    <necklace class="gold">
      <sapphire />
    </necklace>
    <ruby />
    `,
    searchedSelector: 'necklace + ruby',
    levelName: 'Combine the Universal Selector',
  },
];
