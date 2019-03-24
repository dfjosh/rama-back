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
          "line": 4,
          "column": 6
        }
      },
      "moduleName": "rama-front/templates/post.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","container-fluid");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var morphs = new Array(2);
      morphs[0] = dom.createMorphAt(element0,1,1);
      morphs[1] = dom.createMorphAt(element0,3,3);
      return morphs;
    },
    statements: [
      ["inline","rama-post",[],["post",["subexpr","@mut",[["get","model",["loc",[null,[2,19],[2,24]]],0,0,0,0]],[],[],0,0]],["loc",[null,[2,2],[2,26]]],0,0],
      ["inline","post/rama-comments",[],["post",["subexpr","@mut",[["get","model",["loc",[null,[3,28],[3,33]]],0,0,0,0]],[],[],0,0]],["loc",[null,[3,2],[3,35]]],0,0]
    ],
    locals: [],
    templates: []
  };
}()));