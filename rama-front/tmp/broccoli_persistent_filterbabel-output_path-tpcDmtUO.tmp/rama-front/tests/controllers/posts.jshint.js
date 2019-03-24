define('rama-front/tests/controllers/posts.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/posts.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/posts.js should pass jshint.');
  });
});