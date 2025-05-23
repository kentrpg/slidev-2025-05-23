import { defineAppSetup } from '@slidev/types';
import Test from '../examples/Test.vue?raw';
import InlineStyles from '../examples/InlineStyles.vue?raw';
import ClassConcat from '../examples/ClassConcat.vue?raw';

// 需要透過字串形式提供給 SFC Playground
// - 使用 ?raw 來轉換 sfc component 為字串
const examples = {
  inline: {
    'App.vue': InlineStyles,
  },
  simple: {
    'App.vue': Test,
  },
  classConcat: {
    'ClassConcat.vue': ClassConcat,
  },
};

export default defineAppSetup(({ app }) => {
  app.provide('sfc-examples', examples);
});
