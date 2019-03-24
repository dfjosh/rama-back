define('rama-front/tests/lint/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/admin-toolbar-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/admin-toolbar-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/haiku-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/haiku-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/header-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/header-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/modal-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/modal-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/nav-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/pagination-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pagination-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/post-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/post-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/post-modal-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/post-modal-comp.js should pass ESLint\n\n15:7 - Unexpected console statement. (no-console)\n17:9 - Unexpected \'debugger\' statement. (no-debugger)\n18:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/post/attribution-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/post/attribution-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/post/comments-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/post/comments-comp.js should pass ESLint\n\n');
  });

  QUnit.test('components/post/taxonomy-comp.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/post/taxonomy-comp.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/admin/posts/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/admin/posts/edit.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/admin/taxonomies/taxonomy.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/admin/taxonomies/taxonomy.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/admin/taxonomies/taxonomy/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/admin/taxonomies/taxonomy/edit.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/admin/taxonomies/taxonomy/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/admin/taxonomies/taxonomy/new.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/posts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/posts.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/capitalize.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/capitalize.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/ellipsis.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/ellipsis.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/formatted-date.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/formatted-date.js should pass ESLint\n\n');
  });

  QUnit.test('models/category.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/category.js should pass ESLint\n\n');
  });

  QUnit.test('models/comment.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/comment.js should pass ESLint\n\n');
  });

  QUnit.test('models/post-category.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/post-category.js should pass ESLint\n\n');
  });

  QUnit.test('models/post-tag.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/post-tag.js should pass ESLint\n\n');
  });

  QUnit.test('models/post.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/post.js should pass ESLint\n\n');
  });

  QUnit.test('models/tag.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/tag.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/posts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/posts.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/posts/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/posts/edit.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/taxonomies/taxonomy.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/taxonomies/taxonomy.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/taxonomies/taxonomy/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/taxonomies/taxonomy/edit.js should pass ESLint\n\n');
  });

  QUnit.test('routes/admin/taxonomies/taxonomy/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/admin/taxonomies/taxonomy/new.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/post.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/post.js should pass ESLint\n\n');
  });

  QUnit.test('routes/posts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/posts.js should pass ESLint\n\n');
  });

  QUnit.test('routes/projects.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/projects.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });
});