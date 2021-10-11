import {colors, reflectivity} from '../../helpers/colorsAndReflection.js';

const svgSettings = [
  {
    name: `keyhole`,
    src: `./img/module-6/svg-forms/keyhole.svg`,
    depth: 20,
    cap: 0,
    color: colors.DarkPurple,
    reflectivity: reflectivity.soft
  },
  {
    name: `flamingo`,
    src: `./img/module-6/svg-forms/flamingo.svg`,
    depth: 8,
    cap: 2,
    color: colors.LightDominantRed,
    reflectivity: reflectivity.soft
  },
  {
    name: `leaf`,
    src: `./img/module-6/svg-forms/leaf.svg`,
    depth: 8,
    cap: 2,
    color: colors.Green,
    reflectivity: reflectivity.basic
  },
  {
    name: `leaf1-storyScene1`,
    src: `./img/module-6/svg-forms/leaf.svg`,
    depth: 2,
    cap: 2,
    color: colors.Green,
    reflectivity: reflectivity.basic,
    castShadow: true,
  },
  {
    name: `leaf2-storyScene1`,
    src: `./img/module-6/svg-forms/leaf.svg`,
    depth: 2,
    cap: 2,
    color: colors.Green,
    reflectivity: reflectivity.basic,
    castShadow: true,
  },
  {
    name: `question`,
    src: `./img/module-6/svg-forms/question.svg`,
    depth: 8,
    cap: 2,
    color: colors.Blue,
    reflectivity: reflectivity.basic
  },
  {
    name: `snowflake`,
    src: `./img/module-6/svg-forms/snowflake.svg`,
    depth: 8,
    cap: 2,
    color: colors.Blue,
    reflectivity: reflectivity.basic
  },
  {
    name: `flower-storyScene0`,
    src: `./img/module-6/svg-forms/flower.svg`,
    depth: 4,
    cap: 2,
    color: colors.AdditionalPurple,
    castShadow: true,
    reflectivity: reflectivity.basic,
  },
  {
    name: `flower-storyScene3`,
    src: `./img/module-6/svg-forms/flower.svg`,
    depth: 4,
    cap: 2,
    color: colors.ShadowedAdditionalPurple,
    castShadow: true,
    reflectivity: reflectivity.basic,
  },
];

export default svgSettings;
