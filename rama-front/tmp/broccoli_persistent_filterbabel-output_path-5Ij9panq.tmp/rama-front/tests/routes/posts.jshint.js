define('rama-front/tests/routes/posts.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/posts.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/posts.js should pass jshint.');
  });
});