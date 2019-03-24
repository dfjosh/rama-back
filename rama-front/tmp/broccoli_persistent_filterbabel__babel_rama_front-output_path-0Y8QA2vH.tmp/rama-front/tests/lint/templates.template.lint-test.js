define('rama-front/tests/lint/templates.template.lint-test', [], function () {
  'use strict';

  QUnit.module('TemplateLint');

  QUnit.test('rama-front/templates/about.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/about.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/admin.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/admin.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/admin/posts.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/admin/posts.hbs should pass TemplateLint.\n\nrama-front/templates/admin/posts.hbs\n  19:47  error  you must use double quotes in templates  quotes\n');
  });

  QUnit.test('rama-front/templates/admin/posts/edit.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/admin/posts/edit.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/admin/taxonomies/taxonomy.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/admin/taxonomies/taxonomy.hbs should pass TemplateLint.\n\nrama-front/templates/admin/taxonomies/taxonomy.hbs\n  3:14  error  Incorrect indentation of positional param \'concat\' beginning at L3:C14. Expected \'concat\' to be at L4:C6.  attribute-indentation\n  3:59  error  Incorrect indentation of positional param \'admin.taxonomies.taxonomy.new\' beginning at L3:C59. Expected \'admin.taxonomies.taxonomy.new\' to be at L5:C6.  attribute-indentation\n  3:91  error  Incorrect indentation of attribute \'class\' beginning at L3:C91. Expected \'class\' to be at L6:C6.  attribute-indentation\n  3:125  error  Incorrect indentation of close curly braces \'}}\' for the component \'{{link-to}}\' beginning at L3:C125. Expected \'{{link-to}}\' to be at L7:C4.  attribute-indentation\n');
  });

  QUnit.test('rama-front/templates/admin/taxonomies/taxonomy/edit.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/admin/taxonomies/taxonomy/edit.hbs should pass TemplateLint.\n\nrama-front/templates/admin/taxonomies/taxonomy/edit.hbs\n  13:12  error  Incorrect indentation of htmlAttribute \'type\' beginning at L13:C12. Expected \'type\' to be at L14:C6.  attribute-indentation\n  13:26  error  Incorrect indentation of htmlAttribute \'class\' beginning at L13:C26. Expected \'class\' to be at L15:C6.  attribute-indentation\n  13:59  error  Incorrect indentation of htmlAttribute \'data-dismiss\' beginning at L13:C59. Expected \'data-dismiss\' to be at L16:C6.  attribute-indentation\n  13:107  error  Incorrect indentation of close bracket \'>\' for the element \'<button>\' beginning at L13:C107. Expected \'<button>\' to be at L17:C4.  attribute-indentation\n  13:114  error  Incorrect indentation of close tag \'</button>\' for element \'<button>\' beginning at L13:C114. Expected \'</button>\' to be at L13:C4.  attribute-indentation\n  15:12  error  Incorrect indentation of htmlAttribute \'type\' beginning at L15:C12. Expected \'type\' to be at L16:C6.  attribute-indentation\n  15:26  error  Incorrect indentation of htmlAttribute \'class\' beginning at L15:C26. Expected \'class\' to be at L17:C6.  attribute-indentation\n  15:50  error  Incorrect indentation of htmlAttribute \'data-dismiss\' beginning at L15:C50. Expected \'data-dismiss\' to be at L18:C6.  attribute-indentation\n  15:96  error  Incorrect indentation of close bracket \'>\' for the element \'<button>\' beginning at L15:C96. Expected \'<button>\' to be at L19:C4.  attribute-indentation\n  15:109  error  Incorrect indentation of close tag \'</button>\' for element \'<button>\' beginning at L15:C109. Expected \'</button>\' to be at L15:C4.  attribute-indentation\n');
  });

  QUnit.test('rama-front/templates/admin/taxonomies/taxonomy/new.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/admin/taxonomies/taxonomy/new.hbs should pass TemplateLint.\n\nrama-front/templates/admin/taxonomies/taxonomy/new.hbs\n  1:14  error  Incorrect indentation of attribute \'id\' beginning at L1:C14. Expected \'id\' to be at L2:C2.  attribute-indentation\n  1:55  error  Incorrect indentation of attribute \'modalId\' beginning at L1:C55. Expected \'modalId\' to be at L3:C2.  attribute-indentation\n  1:77  error  Incorrect indentation of attribute \'isRoute\' beginning at L1:C77. Expected \'isRoute\' to be at L4:C2.  attribute-indentation\n  1:90  error  Incorrect indentation of attribute \'size\' beginning at L1:C90. Expected \'size\' to be at L5:C2.  attribute-indentation\n  1:99  error  Incorrect indentation of close curly braces \'}}\' for the component \'{{modal-comp}}\' beginning at L1:C99. Expected \'{{modal-comp}}\' to be at L6:C0.  attribute-indentation\n  14:12  error  Incorrect indentation of htmlAttribute \'type\' beginning at L14:C12. Expected \'type\' to be at L15:C6.  attribute-indentation\n  14:26  error  Incorrect indentation of htmlAttribute \'class\' beginning at L14:C26. Expected \'class\' to be at L16:C6.  attribute-indentation\n  14:50  error  Incorrect indentation of htmlAttribute \'data-dismiss\' beginning at L14:C50. Expected \'data-dismiss\' to be at L17:C6.  attribute-indentation\n  14:98  error  Incorrect indentation of close bracket \'>\' for the element \'<button>\' beginning at L14:C98. Expected \'<button>\' to be at L18:C4.  attribute-indentation\n  14:105  error  Incorrect indentation of close tag \'</button>\' for element \'<button>\' beginning at L14:C105. Expected \'</button>\' to be at L14:C4.  attribute-indentation\n');
  });

  QUnit.test('rama-front/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/application.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/components/admin-toolbar-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/components/admin-toolbar-comp.hbs should pass TemplateLint.\n\nrama-front/templates/components/admin-toolbar-comp.hbs\n  3:12  error  Incorrect indentation of htmlAttribute \'class\' beginning at L3:C12. Expected \'class\' to be at L4:C6.  attribute-indentation\n  3:43  error  Incorrect indentation of htmlAttribute \'data-toggle\' beginning at L3:C43. Expected \'data-toggle\' to be at L5:C6.  attribute-indentation\n  3:63  error  Incorrect indentation of htmlAttribute \'data-target\' beginning at L3:C63. Expected \'data-target\' to be at L6:C6.  attribute-indentation\n  3:90  error  Incorrect indentation of close bracket \'>\' for the element \'<button>\' beginning at L3:C90. Expected \'<button>\' to be at L7:C4.  attribute-indentation\n  3:99  error  Incorrect indentation of close tag \'</button>\' for element \'<button>\' beginning at L3:C99. Expected \'</button>\' to be at L3:C4.  attribute-indentation\n  5:17  error  Incorrect indentation of positional param \'posts\' beginning at L5:C17. Expected \'posts\' to be at L6:C8.  attribute-indentation\n  5:25  error  Incorrect indentation of attribute \'class\' beginning at L5:C25. Expected \'class\' to be at L7:C8.  attribute-indentation\n  5:56  error  Incorrect indentation of attribute \'current-when\' beginning at L5:C56. Expected \'current-when\' to be at L8:C8.  attribute-indentation\n  5:91  error  Incorrect indentation of close curly braces \'}}\' for the component \'{{link-to}}\' beginning at L5:C91. Expected \'{{link-to}}\' to be at L9:C6.  attribute-indentation\n');
  });

  QUnit.test('rama-front/templates/components/haiku-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/components/haiku-comp.hbs should pass TemplateLint.\n\nrama-front/templates/components/haiku-comp.hbs\n  9:10  error  Incorrect indentation for `<span>` beginning at L9:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  10:10  error  Incorrect indentation for `<span>` beginning at L10:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  12:10  error  Incorrect indentation for `<span>` beginning at L12:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  13:10  error  Incorrect indentation for `<span>` beginning at L13:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  14:10  error  Incorrect indentation for `<span>` beginning at L14:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  16:10  error  Incorrect indentation for `<span>` beginning at L16:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  17:10  error  Incorrect indentation for `<span>` beginning at L17:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  18:10  error  Incorrect indentation for `<span>` beginning at L18:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  20:10  error  Incorrect indentation for `<span>` beginning at L20:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  21:10  error  Incorrect indentation for `<span>` beginning at L21:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  22:10  error  Incorrect indentation for `<span>` beginning at L22:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  24:10  error  Incorrect indentation for `<span>` beginning at L24:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  25:10  error  Incorrect indentation for `<span>` beginning at L25:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  26:10  error  Incorrect indentation for `<span>` beginning at L26:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  28:10  error  Incorrect indentation for `<span>` beginning at L28:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  29:10  error  Incorrect indentation for `<span>` beginning at L29:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  30:10  error  Incorrect indentation for `<span>` beginning at L30:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  32:10  error  Incorrect indentation for `<span>` beginning at L32:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  33:10  error  Incorrect indentation for `<span>` beginning at L33:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  34:10  error  Incorrect indentation for `<span>` beginning at L34:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  36:10  error  Incorrect indentation for `<span>` beginning at L36:C10. Expected `<span>` to be at an indentation of 4 but was found at 10.  block-indentation\n  8:27  error  Incorrect indentation for `span` beginning at L3:C4. Expected `</span>` ending at L8:C27 to be at an indentation of 4 but was found at 20.  block-indentation\n  41:11  error  Incorrect indentation for `span` beginning at L36:C10. Expected `</span>` ending at L41:C11 to be at an indentation of 10 but was found at 4.  block-indentation\n  36:16  error  Incorrect indentation for `return $haiku;\n\n      }\n\n      aboutMe("Joshua");\n    ` beginning at L36:C16. Expected `return $haiku;\n\n      }\n\n      aboutMe("Joshua");\n    ` to be at an indentation of 12 but was found at 16.  block-indentation\n');
  });

  QUnit.test('rama-front/templates/components/header-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/components/header-comp.hbs should pass TemplateLint.\n\nrama-front/templates/components/header-comp.hbs\n  7:9  error  Incorrect indentation of htmlAttribute \'src\' beginning at L7:C9. Expected \'src\' to be at L8:C6.  attribute-indentation\n  7:85  error  Incorrect indentation of close bracket \'>\' for the element \'<img>\' beginning at L7:C85. Expected \'<img>\' to be at L9:C4.  attribute-indentation\n  7:4  error  img tags must have an alt attribute  img-alt-attributes\n');
  });

  QUnit.test('rama-front/templates/components/modal-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/components/modal-comp.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/components/nav-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/components/nav-comp.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/components/pagination-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/components/pagination-comp.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/components/post-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/components/post-comp.hbs should pass TemplateLint.\n\nrama-front/templates/components/post-comp.hbs\n  31:10  error  img tags must have an alt attribute  img-alt-attributes\n');
  });

  QUnit.test('rama-front/templates/components/post-modal-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/components/post-modal-comp.hbs should pass TemplateLint.\n\nrama-front/templates/components/post-modal-comp.hbs\n  11:18  error  Incorrect indentation of attribute \'class\' beginning at L11:C18. Expected \'class\' to be at L12:C12.  attribute-indentation\n  11:48  error  Incorrect indentation of attribute \'value\' beginning at L11:C48. Expected \'value\' to be at L13:C12.  attribute-indentation\n  11:66  error  Incorrect indentation of attribute \'type\' beginning at L11:C66. Expected \'type\' to be at L14:C12.  attribute-indentation\n  11:78  error  Incorrect indentation of attribute \'placeholder\' beginning at L11:C78. Expected \'placeholder\' to be at L15:C12.  attribute-indentation\n  11:97  error  Incorrect indentation of close curly braces \'}}\' for the component \'{{input}}\' beginning at L11:C97. Expected \'{{input}}\' to be at L16:C10.  attribute-indentation\n  21:22  error  Incorrect indentation of htmlAttribute \'id\' beginning at L21:C22. Expected \'id\' to be at L22:C16.  attribute-indentation\n  21:42  error  Incorrect indentation of htmlAttribute \'type\' beginning at L21:C42. Expected \'type\' to be at L23:C16.  attribute-indentation\n  21:56  error  Incorrect indentation of htmlAttribute \'data-toggle\' beginning at L21:C56. Expected \'data-toggle\' to be at L24:C16.  attribute-indentation\n  21:79  error  Incorrect indentation of htmlAttribute \'class\' beginning at L21:C79. Expected \'class\' to be at L25:C16.  attribute-indentation\n  21:109  error  Incorrect indentation of close bracket \'>\' for the element \'<button>\' beginning at L21:C109. Expected \'<button>\' to be at L26:C14.  attribute-indentation\n  45:22  error  Incorrect indentation of htmlAttribute \'id\' beginning at L45:C22. Expected \'id\' to be at L46:C16.  attribute-indentation\n  45:37  error  Incorrect indentation of htmlAttribute \'type\' beginning at L45:C37. Expected \'type\' to be at L47:C16.  attribute-indentation\n  45:51  error  Incorrect indentation of htmlAttribute \'data-toggle\' beginning at L45:C51. Expected \'data-toggle\' to be at L48:C16.  attribute-indentation\n  45:74  error  Incorrect indentation of htmlAttribute \'class\' beginning at L45:C74. Expected \'class\' to be at L49:C16.  attribute-indentation\n  45:101  error  Incorrect indentation of close bracket \'>\' for the element \'<button>\' beginning at L45:C101. Expected \'<button>\' to be at L50:C14.  attribute-indentation\n  72:21  error  Incorrect indentation of attribute \'class\' beginning at L72:C21. Expected \'class\' to be at L73:C12.  attribute-indentation\n  72:51  error  Incorrect indentation of attribute \'value\' beginning at L72:C51. Expected \'value\' to be at L74:C12.  attribute-indentation\n  72:68  error  Incorrect indentation of attribute \'rows\' beginning at L72:C68. Expected \'rows\' to be at L75:C12.  attribute-indentation\n  72:78  error  Incorrect indentation of attribute \'placeholder\' beginning at L72:C78. Expected \'placeholder\' to be at L76:C12.  attribute-indentation\n  72:109  error  Incorrect indentation of close curly braces \'}}\' for the component \'{{textarea}}\' beginning at L72:C109. Expected \'{{textarea}}\' to be at L77:C10.  attribute-indentation\n  81:22  error  Incorrect indentation of htmlAttribute \'type\' beginning at L81:C22. Expected \'type\' to be at L82:C16.  attribute-indentation\n  81:36  error  Incorrect indentation of htmlAttribute \'class\' beginning at L81:C36. Expected \'class\' to be at L83:C16.  attribute-indentation\n  81:66  error  Incorrect indentation of htmlAttribute \'data-dismiss\' beginning at L81:C66. Expected \'data-dismiss\' to be at L84:C16.  attribute-indentation\n  81:110  error  Incorrect indentation of close bracket \'>\' for the element \'<button>\' beginning at L81:C110. Expected \'<button>\' to be at L85:C14.  attribute-indentation\n  81:117  error  Incorrect indentation of close tag \'</button>\' for element \'<button>\' beginning at L81:C117. Expected \'</button>\' to be at L81:C14.  attribute-indentation\n');
  });

  QUnit.test('rama-front/templates/components/post/attribution-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/components/post/attribution-comp.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/components/post/comments-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/components/post/comments-comp.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/components/post/taxonomy-comp.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/components/post/taxonomy-comp.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/index.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/login.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rama-front/templates/login.hbs should pass TemplateLint.\n\nrama-front/templates/login.hbs\n  8:16  error  Incorrect indentation of attribute \'class\' beginning at L8:C16. Expected \'class\' to be at L9:C10.  attribute-indentation\n  8:37  error  Incorrect indentation of attribute \'type\' beginning at L8:C37. Expected \'type\' to be at L10:C10.  attribute-indentation\n  8:53  error  Incorrect indentation of attribute \'placeholder\' beginning at L8:C53. Expected \'placeholder\' to be at L11:C10.  attribute-indentation\n  8:76  error  Incorrect indentation of attribute \'value\' beginning at L8:C76. Expected \'value\' to be at L12:C10.  attribute-indentation\n  8:90  error  Incorrect indentation of close curly braces \'}}\' for the component \'{{input}}\' beginning at L8:C90. Expected \'{{input}}\' to be at L13:C8.  attribute-indentation\n');
  });

  QUnit.test('rama-front/templates/post.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/post.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/posts.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/posts.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('rama-front/templates/projects.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rama-front/templates/projects.hbs should pass TemplateLint.\n\n');
  });
});