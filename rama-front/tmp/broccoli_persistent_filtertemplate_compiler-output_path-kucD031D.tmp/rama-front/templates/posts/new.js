export default Ember.HTMLBars.template((function() {
  return {
    meta: {
      "revision": "Ember@2.7.3",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 74
        }
      },
      "moduleName": "rama-front/templates/posts/new.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(1);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["inline","posts/rama-new",[],["store",["subexpr","@mut",[["get","store",["loc",[null,[1,23],[1,28]]],0,0,0,0]],[],[],0,0],"categories",["subexpr","@mut",[["get","model.categories",["loc",[null,[1,40],[1,56]]],0,0,0,0]],[],[],0,0],"tags",["subexpr","@mut",[["get","model.tags",["loc",[null,[1,62],[1,72]]],0,0,0,0]],[],[],0,0]],["loc",[null,[1,0],[1,74]]],0,0]
    ],
    locals: [],
    templates: []
  };
}()));