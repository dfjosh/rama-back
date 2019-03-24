define('rama-front/tests/integration/components/posts/rama-index-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | posts/rama index', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "oIb2NRl6",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"posts/rama-index\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.dom('*').hasText('');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kMZd14Y+",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"posts/rama-index\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.dom('*').hasText('template block text');
    });
  });
});