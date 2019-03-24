
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _Input.default;
  }
});
Object.defineProperty(exports, "Search", {
  enumerable: true,
  get: function get() {
    return _Search.default;
  }
});
Object.defineProperty(exports, "TextArea", {
  enumerable: true,
  get: function get() {
    return _TextArea.default;
  }
});
exports.default = void 0;

var _Input = _interopRequireDefault(require("./Input"));

var _Search = _interopRequireDefault(require("./Search"));

var _TextArea = _interopRequireDefault(require("./TextArea"));

_Input.default.Search = _Search.default;
_Input.default.TextArea = _TextArea.default;
var _default = _Input.default;
exports.default = _default;