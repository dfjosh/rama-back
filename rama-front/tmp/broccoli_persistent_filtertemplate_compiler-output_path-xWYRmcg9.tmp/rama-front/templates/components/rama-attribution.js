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
          "column": 0
        }
      },
      "moduleName": "rama-front/templates/components/rama-attribution.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("em");
      var el2 = dom.createElement("strong");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\nat ");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("em");
      var el2 = dom.createElement("strong");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\non ");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("em");
      var el2 = dom.createElement("strong");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(3);
      morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 0]),0,0);
      morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 0]),0,0);
      morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4, 0]),0,0);
      return morphs;
    },
    statements: [
      ["inline","if",[["get","post.author",["loc",[null,[1,17],[1,28]]],0,0,0,0],["get","post.author",["loc",[null,[1,29],[1,40]]],0,0,0,0],"Unknown"],[],["loc",[null,[1,12],[1,52]]],0,0],
      ["inline","moment-format",[["get","post.createdAt",["loc",[null,[2,31],[2,45]]],0,0,0,0],"h:mm a"],[],["loc",[null,[2,15],[2,56]]],0,0],
      ["inline","moment-format",[["get","post.createdAt",["loc",[null,[3,31],[3,45]]],0,0,0,0],"MMMM D, YYYY"],[],["loc",[null,[3,15],[3,62]]],0,0]
    ],
    locals: [],
    templates: []
  };
}()));