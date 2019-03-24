QUnit.module('JSHint | components/posts/rama-new.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/posts/rama-new.js should pass jshint.\ncomponents/posts/rama-new.js: line 15, col 24, \'post\' is defined but never used.\n\n1 error');
});
