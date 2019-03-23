/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/Demo.js":
/*!**************************!*\
  !*** ./examples/Demo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DemoList = _interopRequireDefault(__webpack_require__(/*! ./DemoList */ "./examples/DemoList.js"));

var Demo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Demo, _Component);

  function Demo() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Demo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Demo)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      current: _DemoList.default[0]
    });
    return _this;
  }

  (0, _createClass2.default)(Demo, [{
    key: "onDemoChange",
    value: function onDemoChange(item, e) {
      this.setState({
        current: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "slider"
      }, _DemoList.default.map(function (item, i) {
        return _react.default.createElement("div", {
          className: current === item ? 'active' : '',
          onClick: _this2.onDemoChange.bind(_this2, item)
        }, item.label);
      })), _react.default.createElement("div", {
        className: "content"
      }, current ? _react.default.createElement(current.component, null) : null));
    }
  }]);
  return Demo;
}(_react.Component);

exports.default = Demo;

/***/ }),

/***/ "./examples/DemoList.js":
/*!******************************!*\
  !*** ./examples/DemoList.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(__webpack_require__(/*! ./demos/demo1 */ "./examples/demos/demo1.js"));

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./demos/Demo2 */ "./examples/demos/Demo2.js"));

// import Demo3 from './demos/Demo3';
// import Demo4 from './demos/Demo4';
var _default = [{
  label: 'Input',
  component: _demo.default
}, {
  label: 'Search',
  component: _Demo.default
}];
exports.default = _default;

/***/ }),

/***/ "./examples/demos/Demo2.js":
/*!*********************************!*\
  !*** ./examples/demos/Demo2.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactWidgetIcon = _interopRequireDefault(__webpack_require__(/*! react-widget-icon */ "./node_modules/react-widget-icon/index.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ../../src/index */ "./src/index.js"));

function SearchInputs() {
  return _react.default.createElement("div", {
    className: "input-demo-wrapper"
  }, _react.default.createElement(_index.default.Search, {
    onSearch: function onSearch(s) {
      return alert(s);
    },
    placeholder: "Enter something...",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default.Search, {
    enterButton: true,
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default.Search, {
    enterButton: "Search...",
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default.Search, {
    size: "small",
    placeholder: "Enter something...",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default.Search, {
    enterButton: true,
    size: "small",
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default.Search, {
    enterButton: "Search...",
    size: "small",
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default.Search, {
    size: "large",
    placeholder: "Enter something...",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default.Search, {
    enterButton: true,
    size: "large",
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default.Search, {
    enterButton: "Search...",
    size: "large",
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }));
}

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    (0, _classCallCheck2.default)(this, DEMO);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DEMO).apply(this, arguments));
  }

  (0, _createClass2.default)(DEMO, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(SearchInputs, null));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/demos/demo1.js":
/*!*********************************!*\
  !*** ./examples/demos/demo1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactWidgetIcon = _interopRequireDefault(__webpack_require__(/*! react-widget-icon */ "./node_modules/react-widget-icon/index.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ../../src/index */ "./src/index.js"));

function IconInputs() {
  return _react.default.createElement("div", {
    className: "input-demo-wrapper"
  }, _react.default.createElement(_index.default, {
    allowClear: true,
    prepend: "http://",
    append: ".com",
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    suffix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    })
  }), _react.default.createElement(_index.default, {
    allowClear: true,
    append: ".com",
    autoFocus: true,
    onPressEnter: function onPressEnter() {
      return alert('enter');
    },
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    suffix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    })
  }), _react.default.createElement(_index.default, {
    allowClear: true,
    prepend: "http://",
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    suffix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    })
  }), _react.default.createElement(_index.default, {
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    readOnly: true,
    size: "small",
    placeholder: "small size"
  }), _react.default.createElement(_index.default, {
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    allowClear: true
  }), _react.default.createElement(_index.default, {
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    allowClear: true,
    size: "large"
  }), _react.default.createElement(_index.default, {
    allowClear: true,
    size: "large",
    disabled: true,
    placeholder: "small large",
    value: "test..."
  }), _react.default.createElement(_index.default, {
    size: "small",
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    suffix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default, {
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    suffix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default, {
    size: "large",
    prefix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    suffix: _react.default.createElement(_reactWidgetIcon.default, {
      type: "ios-contact"
    }),
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }));
}

function SearchInputs() {
  return _react.default.createElement("div", {
    className: "input-demo-wrapper"
  }, _react.default.createElement(_index.default, {
    search: true,
    placeholder: "Enter something...",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default, {
    search: true,
    enterButton: true,
    icon: "ios-arrow-down",
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default, {
    search: true,
    enterButton: "Search...",
    icon: "ios-arrow-down",
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }), _react.default.createElement(_index.default, {
    icon: "ios-arrow-down",
    placeholder: "Enter name",
    style: {
      width: 'auto'
    }
  }));
}

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    (0, _classCallCheck2.default)(this, DEMO);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DEMO).apply(this, arguments));
  }

  (0, _createClass2.default)(DEMO, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(IconInputs, null));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/index.js":
/*!***************************!*\
  !*** ./examples/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

__webpack_require__(/*! ./style/index.scss */ "./examples/style/index.scss");

__webpack_require__(/*! ./style/animate.scss */ "./examples/style/animate.scss");

__webpack_require__(/*! ../src/style/index.scss */ "./src/style/index.scss");

__webpack_require__(/*! react-widget-icon/lib/style/index.css */ "./node_modules/react-widget-icon/lib/style/index.css");

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./Demo */ "./examples/Demo.js"));

_reactDom.default.render(_react.default.createElement(_Demo.default, null), demo);

/***/ }),

/***/ "./examples/style/animate.scss":
/*!*************************************!*\
  !*** ./examples/style/animate.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./examples/style/index.scss":
/*!***********************************!*\
  !*** ./examples/style/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/Input.js":
/*!**********************!*\
  !*** ./src/Input.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _create = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/extends */ "./node_modules/@babel/runtime-corejs2/helpers/extends.js"));

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames9 = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _omit = _interopRequireDefault(__webpack_require__(/*! lodash/omit */ "./node_modules/lodash/omit.js"));

var _warning = _interopRequireDefault(__webpack_require__(/*! warning */ "./node_modules/warning/warning.js"));

var _reactWidgetIcon = _interopRequireDefault(__webpack_require__(/*! react-widget-icon */ "./node_modules/react-widget-icon/index.js"));

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value;
}

function shouldAffixWrapped(props) {
  return (props.prepend || props.append) && !!(props.prefix || props.suffix || props.allowClear);
}

var propTypes = {
  prefixCls: _propTypes.default.string,
  size: _propTypes.default.oneOf(['small', 'default', 'large']),
  className: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  style: _propTypes.default.object,
  type: _propTypes.default.string,
  maxLength: _propTypes.default.number,
  onPressEnter: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onChange: _propTypes.default.func,
  inputClassName: _propTypes.default.string,
  inputStyle: _propTypes.default.object,
  allowClear: _propTypes.default.bool,
  //search: PropTypes.bool,
  //enterButton: PropTypes.any,
  prepend: _propTypes.default.node,
  prependProps: _propTypes.default.object,
  append: _propTypes.default.node,
  appendProps: _propTypes.default.object,
  prefix: _propTypes.default.node,
  prefixProps: _propTypes.default.object,
  suffix: _propTypes.default.node,
  suffixProps: _propTypes.default.object
};

var Input =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Input, _React$Component);
  (0, _createClass2.default)(Input, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('value' in nextProps) {
        return {
          value: nextProps.value
        };
      }

      return null;
    }
  }]);

  function Input(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Input).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyDown", function (e) {
      var _this$props = _this.props,
          onPressEnter = _this$props.onPressEnter,
          onKeyDown = _this$props.onKeyDown;

      if (e.keyCode === 13 && onPressEnter) {
        onPressEnter(e);
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function (e) {
      _this.setValue(e.target.value, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "saveInput", function (input) {
      _this.input = input;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleReset", function (e) {
      _this.setValue('', e, function () {
        _this.focus();
      });
    });
    var value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    _this.state = {
      value: value
    };
    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      if (shouldAffixWrapped(prevProps) !== shouldAffixWrapped(this.props)) {
        (0, _warning.default)(this.input !== document.activeElement, 'Input', "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change.");
      }

      return null;
    } // Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
    // We keep an empty function here.

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "focus",
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "select",
    value: function select() {
      this.input.select();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.focus();
      }
    } // getInputClassName() {
    //     const { prefixCls, size, disabled, inputClassName, prefix, suffix } = this.props;
    //     return classnames(prefixCls, {
    //         [`${prefixCls}-${size}`]: size,
    //         [`${prefixCls}-disabled`]: disabled,
    //         [`${prefixCls}-with-prefix`]: prefix,
    //         [`${prefixCls}-with-suffix`]: suffix,
    //         [inputClassName]: inputClassName,
    //     });
    // }

  }, {
    key: "getInput",
    value: function getInput() {
      return this.input;
    }
  }, {
    key: "renderInput",
    value: function renderInput() {
      return _react.default.createElement(_react.default.Fragment, null, this.renderPrepend(), this.renderIconInput(), this.renderAppend());
    }
  }, {
    key: "renderIconInput",
    value: function renderIconInput() {
      var _classnames;

      var props = this.props;
      var prefixCls = props.prefixCls,
          inputStyle = props.inputStyle,
          type = props.type,
          maxLength = props.maxLength,
          size = props.size,
          disabled = props.disabled,
          inputClassName = props.inputClassName;
      var value = this.state.value;
      var otherProps = (0, _omit.default)(props, (0, _keys.default)(propTypes));
      var prefixIcon = this.renderPrefixIcon();
      var suffixIcon = this.renderSuffixIcon();
      var inputCls = (0, _classnames9.default)(prefixCls, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(size), size), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-disabled"), disabled), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-with-prefix"), !!prefixIcon), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-with-suffix"), !!suffixIcon), (0, _defineProperty2.default)(_classnames, inputClassName, inputClassName), _classnames));

      var Input = _react.default.createElement(_react.default.Fragment, null, prefixIcon, _react.default.createElement("input", (0, _extends2.default)({}, otherProps, {
        ref: this.saveInput,
        type: type,
        className: inputCls,
        style: inputStyle,
        maxLength: maxLength,
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown,
        value: fixControlledValue(value)
      })), suffixIcon);

      if (!shouldAffixWrapped(props)) {
        return Input;
      }

      var affixWrapperCls = (0, _classnames9.default)(props.className, "".concat(prefixCls, "-affix-wrapper"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-affix-wrapper-").concat(props.size), props.size));
      return _react.default.createElement("span", {
        className: affixWrapperCls,
        style: props.style
      }, Input);
    }
  }, {
    key: "renderPrepend",
    value: function renderPrepend() {
      var _this$props2 = this.props,
          prepend = _this$props2.prepend,
          prependProps = _this$props2.prependProps,
          prefixCls = _this$props2.prefixCls;
      return prepend ? _react.default.createElement("div", (0, _extends2.default)({}, prependProps, {
        className: (0, _classnames9.default)("".concat(prefixCls, "-group-prepend"), prependProps.className)
      }), prepend) : null;
    }
  }, {
    key: "renderAppend",
    value: function renderAppend() {
      var _this$props3 = this.props,
          append = _this$props3.append,
          appendProps = _this$props3.appendProps,
          prefixCls = _this$props3.prefixCls;
      return append ? _react.default.createElement("div", (0, _extends2.default)({}, appendProps, {
        className: (0, _classnames9.default)("".concat(prefixCls, "-group-append"), appendProps.className)
      }), append) : null;
    }
  }, {
    key: "renderPrefixIcon",
    value: function renderPrefixIcon() {
      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          prefix = _this$props4.prefix,
          prefixProps = _this$props4.prefixProps;

      if (prefix) {
        var _classnames4;

        return _react.default.createElement("span", (0, _extends2.default)({}, prefixProps, {
          className: (0, _classnames9.default)("".concat(prefixCls, "-prefix"), prefixProps.className)
        }), typeof prefix === 'string' ? _react.default.createElement(_reactWidgetIcon.default, {
          type: prefix,
          className: (0, _classnames9.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-icon"), true))
        }) : _react.default.cloneElement(prefix, {
          className: (0, _classnames9.default)((_classnames4 = {}, (0, _defineProperty2.default)(_classnames4, prefix.props.className, prefix.props.className), (0, _defineProperty2.default)(_classnames4, "".concat(prefixCls, "-icon"), true), _classnames4))
        }));
      }

      return null;
    }
  }, {
    key: "renderSuffixIcon",
    value: function renderSuffixIcon() {
      var _this$props5 = this.props,
          prefixCls = _this$props5.prefixCls,
          suffix = _this$props5.suffix,
          suffixProps = _this$props5.suffixProps;
      var clearIcon = this.renderClearIcon();

      if (suffix || clearIcon) {
        var _classnames6;

        return _react.default.createElement("span", (0, _extends2.default)({}, suffixProps, {
          className: (0, _classnames9.default)("".concat(prefixCls, "-suffix"), suffixProps.className)
        }), clearIcon ? clearIcon : typeof suffix === 'string' ? _react.default.createElement(_reactWidgetIcon.default, {
          type: suffix,
          className: (0, _classnames9.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-icon"), true))
        }) : _react.default.cloneElement(suffix, {
          className: (0, _classnames9.default)((_classnames6 = {}, (0, _defineProperty2.default)(_classnames6, suffix.props.className, suffix.props.className), (0, _defineProperty2.default)(_classnames6, "".concat(prefixCls, "-icon"), true), _classnames6))
        }));
      }

      return null;
    }
  }, {
    key: "renderClearIcon",
    value: function renderClearIcon() {
      var _classnames7;

      var _this$props6 = this.props,
          allowClear = _this$props6.allowClear,
          disabled = _this$props6.disabled,
          prefixCls = _this$props6.prefixCls;
      var value = this.state.value;

      if (!allowClear || disabled || value === undefined || value === null || value === '') {
        return null;
      }

      return _react.default.createElement(_reactWidgetIcon.default, {
        type: "ios-close-circle",
        onClick: this.handleReset,
        className: (0, _classnames9.default)((_classnames7 = {}, (0, _defineProperty2.default)(_classnames7, "".concat(prefixCls, "-icon"), true), (0, _defineProperty2.default)(_classnames7, "".concat(prefixCls, "-icon-clear"), true), _classnames7))
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value, e, callback) {
      if (!('value' in this.props)) {
        this.setState({
          value: value
        }, callback);
      }

      var onChange = this.props.onChange;

      if (onChange) {
        var event = e;

        if (e.type === 'click') {
          // click clear icon
          event = (0, _create.default)(e);
          event.target = this.input;
          event.currentTarget = this.input;
          var originalInputValue = this.input.value; // change input value cause e.target.value should be '' when clear input

          this.input.value = '';
          onChange('', event); // reset input value

          this.input.value = originalInputValue;
          return;
        }

        onChange(value, event);
      }
    }
  }, {
    key: "getWrapperClassName",
    value: function getWrapperClassName() {
      var _classnames8;

      var _this$props7 = this.props,
          prefixCls = _this$props7.prefixCls,
          className = _this$props7.className,
          size = _this$props7.size,
          prepend = _this$props7.prepend,
          append = _this$props7.append,
          search = _this$props7.search,
          enterButton = _this$props7.enterButton;
      return (0, _classnames9.default)((_classnames8 = {}, (0, _defineProperty2.default)(_classnames8, className, className), (0, _defineProperty2.default)(_classnames8, "".concat(prefixCls, "-wrapper"), true), (0, _defineProperty2.default)(_classnames8, "".concat(prefixCls, "-wrapper-").concat(size), !!size), (0, _defineProperty2.default)(_classnames8, "".concat(prefixCls, "-group"), prepend || append || search && enterButton), (0, _defineProperty2.default)(_classnames8, "".concat(prefixCls, "-group-size"), (prepend || append || search && enterButton) && !!size), (0, _defineProperty2.default)(_classnames8, "".concat(prefixCls, "-group-with-prepend"), prepend), (0, _defineProperty2.default)(_classnames8, "".concat(prefixCls, "-group-with-append"), append || search && enterButton), _classnames8));
    }
  }, {
    key: "render",
    value: function render() {
      var style = this.props.style;
      return _react.default.createElement("div", {
        className: this.getWrapperClassName(),
        style: style
      }, this.renderInput());
    }
  }]);
  return Input;
}(_react.default.Component);

exports.default = Input;
(0, _defineProperty2.default)(Input, "propTypes", propTypes);
(0, _defineProperty2.default)(Input, "defaultProps", {
  prefixCls: 'rw-input',
  type: 'text',
  disabled: false,
  prependProps: {},
  appendProps: {},
  prefixProps: {},
  suffixProps: {}
});

/***/ }),

/***/ "./src/Search.js":
/*!***********************!*\
  !*** ./src/Search.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/extends */ "./node_modules/@babel/runtime-corejs2/helpers/extends.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/objectWithoutProperties.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames2 = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _reactWidgetIcon = _interopRequireDefault(__webpack_require__(/*! react-widget-icon */ "./node_modules/react-widget-icon/index.js"));

var _omit = _interopRequireDefault(__webpack_require__(/*! lodash/omit */ "./node_modules/lodash/omit.js"));

var _Input = _interopRequireDefault(__webpack_require__(/*! ./Input */ "./src/Input.js"));

function fixControlledValue(value) {
  if (value == null) {
    return '';
  }

  return value;
}

var propTypes = {
  prefixCls: _propTypes.default.string,
  enterButton: _propTypes.default.any
};

var Search =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Search, _React$Component);

  function Search() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Search);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Search)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSearch", function (e) {
      var onSearch = _this.props.onSearch;

      if (onSearch) {
        onSearch(_this.input.input.value, e);
      }

      _this.input.focus();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "saveInput", function (node) {
      _this.input = node;
    });
    return _this;
  }

  (0, _createClass2.default)(Search, [{
    key: "focus",
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          enterButton = _this$props.enterButton,
          className = _this$props.className,
          onSearch = _this$props.onSearch,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, ["prefixCls", "enterButton", "className", "onSearch"]);
      var inputClassName = (0, _classnames2.default)(className, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-with-search"), true));
      var suffix, append;

      if (enterButton === false) {
        suffix = "ios-search";
      } else {
        append = enterButton === true ? _react.default.createElement(_reactWidgetIcon.default, {
          type: "ios-search",
          className: "".concat(prefixCls, "-icon-search")
        }) : enterButton;
      }

      return _react.default.createElement(_Input.default, (0, _extends2.default)({
        onPressEnter: this.onSearch
      }, restProps, {
        prefixCls: prefixCls,
        className: inputClassName,
        ref: this.saveInput,
        suffix: suffix,
        append: append
      })); // if (enterButton === true) {
      //     return (
      //         <Input
      //             onPressEnter={this.onSearch}
      //             {...restProps}
      //             className={className}
      //             ref={this.saveInput}
      //             append={this.renderSearch()}
      //         />
      //     );
      // }
      // let inputClassName;
      // if (enterButton) {
      //     inputClassName = classNames(prefixCls, className, {
      //         [`${prefixCls}-enter-button`]: !!enterButton,
      //         [`${prefixCls}-${size}`]: !!size,
      //     });
      // } else {
      //     inputClassName = classNames(prefixCls, className);
      // }
      // return (
      //     <Input
      //         onPressEnter={this.onSearch}
      //         {...restProps}
      //         size={size}
      //         prefixCls={inputPrefixCls}
      //         addonAfter={this.renderAddonAfter(prefixCls)}
      //         suffix={this.renderSuffix(prefixCls)}
      //         ref={this.saveInput}
      //         className={inputClassName}
      //     />
      // );
    }
  }]);
  return Search;
}(_react.default.Component);

exports.default = Search;
(0, _defineProperty2.default)(Search, "propTypes", propTypes);
(0, _defineProperty2.default)(Search, "defaultProps", {
  prefixCls: 'rw-input',
  enterButton: false
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Search", {
  enumerable: true,
  get: function get() {
    return _Search.default;
  }
});
exports.default = void 0;

var _Input = _interopRequireDefault(__webpack_require__(/*! ./Input */ "./src/Input.js"));

var _Search = _interopRequireDefault(__webpack_require__(/*! ./Search */ "./src/Search.js"));

_Input.default.Search = _Search.default;
var _default = _Input.default;
exports.default = _default;

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************************************************************************************************************!*\
  !*** multi ./node_modules/packez/lib/fetchPolyfills.js ./node_modules/packez/lib/polyfills.js ./examples/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\input\node_modules\packez\lib\fetchPolyfills.js */"./node_modules/packez/lib/fetchPolyfills.js");
__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\input\node_modules\packez\lib\polyfills.js */"./node_modules/packez/lib/polyfills.js");
module.exports = __webpack_require__(/*! ./examples/index.js */"./examples/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.63ca1d0e.js.map