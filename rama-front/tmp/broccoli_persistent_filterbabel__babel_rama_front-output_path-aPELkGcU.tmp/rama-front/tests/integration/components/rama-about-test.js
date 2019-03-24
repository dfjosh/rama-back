define('rama-front/tests/integration/components/rama-about-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | rama about', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lDDxK6eQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"rama-about\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.dom('*').hasText('');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "H+m2h6/i",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rama-about\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.dom('*').hasText('template block text');
    });
  });
});