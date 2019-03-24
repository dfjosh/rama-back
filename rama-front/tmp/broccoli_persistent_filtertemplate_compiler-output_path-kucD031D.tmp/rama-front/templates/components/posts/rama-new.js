export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.7.3",
        "loc": {
          "source": null,
          "start": {
            "line": 26,
            "column": 18
          },
          "end": {
            "line": 30,
            "column": 18
          }
        },
        "moduleName": "rama-front/templates/components/posts/rama-new.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("                    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("li");
        var el2 = dom.createTextNode("\n                      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","#");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n                    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),0,0);
        return morphs;
      },
      statements: [
        ["content","category.name",["loc",[null,[28,34],[28,51]]],0,0,0,0]
      ],
      locals: ["category"],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.7.3",
        "loc": {
          "source": null,
          "start": {
            "line": 41,
            "column": 18
          },
          "end": {
            "line": 45,
            "column": 18
          }
        },
        "moduleName": "rama-front/templates/components/posts/rama-new.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("                    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("li");
        var el2 = dom.createTextNode("\n                      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","#");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n                    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),0,0);
        return morphs;
      },
      statements: [
        ["content","tag.name",["loc",[null,[43,34],[43,46]]],0,0,0,0]
      ],
      locals: ["tag"],
      templates: []
    };
  }());
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
          "line": 65,
          "column": 6
        }
      },
      "moduleName": "rama-front/templates/components/posts/rama-new.hbs"
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
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","row");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","col-sm-12");
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row title");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-sm-2");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-sm-8");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("h2");
      var el7 = dom.createTextNode("New Post");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","form-group form-group-lg");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-sm-2");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row content");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-sm-2 taxonomy");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("ul");
      dom.setAttribute(el6,"class","list-unstyled");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("li");
      var el8 = dom.createTextNode("\n              ");
      dom.appendChild(el7, el8);
      var el8 = dom.createElement("div");
      dom.setAttribute(el8,"class","dropdown");
      var el9 = dom.createTextNode("\n                ");
      dom.appendChild(el8, el9);
      var el9 = dom.createElement("button");
      dom.setAttribute(el9,"id","categroyButton");
      dom.setAttribute(el9,"type","button");
      dom.setAttribute(el9,"data-toggle","dropdown");
      dom.setAttribute(el9,"class","btn btn-xs btn-info");
      var el10 = dom.createTextNode("\n                  Add Categories\n                  ");
      dom.appendChild(el9, el10);
      var el10 = dom.createElement("span");
      dom.setAttribute(el10,"class","caret");
      dom.appendChild(el9, el10);
      var el10 = dom.createTextNode("\n                ");
      dom.appendChild(el9, el10);
      dom.appendChild(el8, el9);
      var el9 = dom.createTextNode("\n                ");
      dom.appendChild(el8, el9);
      var el9 = dom.createElement("ul");
      dom.setAttribute(el9,"class","dropdown-menu pull-right");
      var el10 = dom.createTextNode("\n");
      dom.appendChild(el9, el10);
      var el10 = dom.createComment("");
      dom.appendChild(el9, el10);
      var el10 = dom.createTextNode("                ");
      dom.appendChild(el9, el10);
      dom.appendChild(el8, el9);
      var el9 = dom.createTextNode("\n              ");
      dom.appendChild(el8, el9);
      dom.appendChild(el7, el8);
      var el8 = dom.createTextNode("\n            ");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("li");
      var el8 = dom.createTextNode("\n              ");
      dom.appendChild(el7, el8);
      var el8 = dom.createElement("div");
      dom.setAttribute(el8,"class","dropdown");
      var el9 = dom.createTextNode("\n                ");
      dom.appendChild(el8, el9);
      var el9 = dom.createElement("button");
      dom.setAttribute(el9,"id","tagButton");
      dom.setAttribute(el9,"type","button");
      dom.setAttribute(el9,"data-toggle","dropdown");
      dom.setAttribute(el9,"class","btn btn-xs btn-success");
      var el10 = dom.createTextNode("\n                  Add Tags\n                  ");
      dom.appendChild(el9, el10);
      var el10 = dom.createElement("span");
      dom.setAttribute(el10,"class","caret");
      dom.appendChild(el9, el10);
      var el10 = dom.createTextNode("\n                ");
      dom.appendChild(el9, el10);
      dom.appendChild(el8, el9);
      var el9 = dom.createTextNode("\n                ");
      dom.appendChild(el8, el9);
      var el9 = dom.createElement("ul");
      dom.setAttribute(el9,"class","dropdown-menu pull-right");
      var el10 = dom.createTextNode("\n");
      dom.appendChild(el9, el10);
      var el10 = dom.createComment("");
      dom.appendChild(el9, el10);
      var el10 = dom.createTextNode("                ");
      dom.appendChild(el9, el10);
      dom.appendChild(el8, el9);
      var el9 = dom.createTextNode("\n              ");
      dom.appendChild(el8, el9);
      dom.appendChild(el7, el8);
      var el8 = dom.createTextNode("\n            ");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n\n          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-sm-8");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","form-group form-group-lg");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","form-group form-group-lg");
      var el7 = dom.createTextNode("\n            ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("button");
      dom.setAttribute(el7,"type","button");
      dom.setAttribute(el7,"class","btn btn-lg btn-primary pull-right");
      var el8 = dom.createTextNode("Publish");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-sm-2");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0, 1, 1]);
      var element1 = dom.childAt(element0, [3]);
      var element2 = dom.childAt(element1, [1, 1]);
      var element3 = dom.childAt(element1, [3]);
      var element4 = dom.childAt(element3, [3, 1]);
      var morphs = new Array(5);
      morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3, 3]),1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 1, 3]),1,1);
      morphs[2] = dom.createMorphAt(dom.childAt(element2, [3, 1, 3]),1,1);
      morphs[3] = dom.createMorphAt(dom.childAt(element3, [1]),1,1);
      morphs[4] = dom.createElementMorph(element4);
      return morphs;
    },
    statements: [
      ["inline","input",[],["class","form-control input-lg","value",["subexpr","@mut",[["get","title",["loc",[null,[10,56],[10,61]]],0,0,0,0]],[],[],0,0],"type","text","placeholder","Title"],["loc",[null,[10,12],[10,95]]],0,0],
      ["block","each",[["get","categories",["loc",[null,[26,26],[26,36]]],0,0,0,0]],[],0,null,["loc",[null,[26,18],[30,27]]]],
      ["block","each",[["get","tags",["loc",[null,[41,26],[41,30]]],0,0,0,0]],[],1,null,["loc",[null,[41,18],[45,27]]]],
      ["inline","textarea",[],["class","form-control input-lg","value",["subexpr","@mut",[["get","body",["loc",[null,[54,59],[54,63]]],0,0,0,0]],[],[],0,0],"rows","10","placeholder","What's happening?"],["loc",[null,[54,12],[54,107]]],0,0],
      ["element","action",["publishPost"],[],["loc",[null,[57,76],[57,100]]],0,0]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));