QUnit.module('JSHint | controllers/posts.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/posts.js should pass jshint.\ncontrollers/posts.js: line 34, col 12, \'DS\' is not defined.\n\n1 error');
});
