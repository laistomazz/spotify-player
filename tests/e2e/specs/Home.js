import Home from '../../../src/views/Home.vue';

const mountVue = require('cypress-vue-unit-test');

describe('Home', () => {
  context('Unit tests', () => {
    beforeEach(mountVue(Home));

    it('Renders correctly', () => {
      cy.contains('button', 'Let\'s do this!');
    });
  });

  context('e2e', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Renders correctly', () => {
      cy.contains('button', 'Let\'s do this!');
    });
  });
});
