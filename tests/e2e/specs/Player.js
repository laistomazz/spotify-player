import Vuex from 'vuex';

import Player from '../../../src/components/Player.vue';
import store from '../../../src/store';

const mountVue = require('cypress-vue-unit-test');

describe('Player', () => {
  context('Unit tests', () => {
    const extensions = {
      plugins: [Vuex],
      components: {
        Player,
      },
    };
    const template = '<Player />';
    const createCmp = data => mountVue({ template, data, store }, { extensions })();

    it('Renders correctly', () => {
      const data = () => ({ currentTrack: { name: 'oi' }, status: 'play' });
      createCmp(data);
      cy.contains('h2', 'Player');
    });
  });
});
