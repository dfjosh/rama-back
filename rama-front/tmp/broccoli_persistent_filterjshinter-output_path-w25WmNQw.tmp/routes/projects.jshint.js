QUnit.module('JSHint | routes/projects.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/projects.js should pass jshint.\nroutes/projects.js: line 16, col 58, Missing semicolon.\nroutes/projects.js: line 10, col 9, \'params\' is defined but never used.\n\n2 errors');
});
