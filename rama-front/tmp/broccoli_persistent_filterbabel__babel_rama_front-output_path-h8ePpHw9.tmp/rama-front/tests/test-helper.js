define('rama-front/tests/test-helper', ['exports', 'rama-front/tests/helpers/resolver', 'ember-qunit'], function (exports, _ramaFrontTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_ramaFrontTestsHelpersResolver['default']);
});