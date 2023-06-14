import { Level } from './types';

export const levels: Level[] = [
  {
    searchedEl: 'necklace',
    markup: `
    <necklace />
    <necklace />`,
    searchedSelector: 'necklace',
    levelName: 'Type Selector',
  },
  {
    searchedEl: 'rings',
    markup: `
    <ring />
    <necklace />
    <ring />`,
    searchedSelector: 'ring ',
    levelName: 'Type Selector',
  },

  {
    searchedEl: 'empire necklace',
    markup: `
    <necklace id="empire"/>
    <necklace />`,
    searchedSelector: '#empire',
    levelName: 'ID Selector',
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
    levelName: 'Descendant Selector',
  },
  {
    searchedEl: 'gold necklace',
    markup: `
    <necklace />
    <necklace class="gold"/>
    <necklace />`,
    searchedSelector: '.gold',
    levelName: 'Class Selector',
  },
  {
    searchedEl: 'gold ring',
    markup: `
    <necklace class="gold" />
    <ring class="gold" />
    <necklace class="gold" />`,
    searchedSelector: 'ring.gold',
    levelName: 'Type & Class Selector',
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
    levelName: 'Comma Combinator',
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
    levelName: 'The Universal Selector',
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
    levelName: 'Tag & Universal Selector',
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
    levelName: 'Adjacent Sibling Selector',
  },
];
