
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

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

var _Input = _interopRequireDefault(require("./Input"));

var _Search = _interopRequireDefault(require("./Search"));

_Input.default.Search = _Search.default;
var _default = _Input.default;
exports.default = _default;