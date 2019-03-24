
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactWidgetResizeObserver = _interopRequireDefault(require("react-widget-resize-observer"));

var _calculateNodeHeight = _interopRequireDefault(require("./calculateNodeHeight"));

var _Input = _interopRequireDefault(require("./Input"));

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }

  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

var ResizeTextArea =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ResizeTextArea, _React$Component);

  function ResizeTextArea() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ResizeTextArea);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ResizeTextArea)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      textareaStyles: {}
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resizeOnNextFrame", function () {
      if (_this.nextFrameActionId) {
        clearNextFrameAction(_this.nextFrameActionId);
      }

      _this.nextFrameActionId = onNextFrame(_this.resizeTextarea);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resizeTextarea", function () {
      var autosize = _this.props.autosize;

      if (!autosize || !_this.textAreaRef) {
        return;
      }

      var minRows = autosize.minRows,
          maxRows = autosize.maxRows;
      var textareaStyles = (0, _calculateNodeHeight.default)(_this.textAreaRef, false, minRows, maxRows);

      _this.setState({
        textareaStyles: textareaStyles
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "saveTextAreaRef", function (textArea) {
      _this.textAreaRef = textArea;
    });
    return _this;
  }

  (0, _createClass2.default)(ResizeTextArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resizeTextarea();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Re-render with the new content then recalculate the height as required.
      if (prevProps.value !== this.props.value) {
        this.resizeOnNextFrame();
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.textAreaRef.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.textAreaRef.blur();
    }
  }, {
    key: "select",
    value: function select() {
      this.textAreaRef.select();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autosize = _this$props.autosize,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props, ["autosize"]);
      var style = (0, _objectSpread2.default)({}, this.props.style, this.state.textareaStyles);
      return _react.default.createElement(_reactWidgetResizeObserver.default, {
        onResize: this.resizeOnNextFrame,
        disabled: !autosize
      }, _react.default.createElement("textarea", (0, _extends2.default)({}, otherProps, {
        style: style,
        ref: this.saveTextAreaRef
      })));
    }
  }, {
    key: "value",
    get: function get() {},
    set: function set(value) {}
  }]);
  return ResizeTextArea;
}(_react.default.Component);

var TextArea =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(TextArea, _React$Component2);

  function TextArea() {
    (0, _classCallCheck2.default)(this, TextArea);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(TextArea).apply(this, arguments));
  }

  (0, _createClass2.default)(TextArea, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return _react.default.createElement(_Input.default, (0, _extends2.default)({}, props, {
        className: (0, _classnames.default)(props.className, "".concat(props.prefixCls, "-textarea-wrapper")),
        inputComponent: ResizeTextArea
      }));
    }
  }]);
  return TextArea;
}(_react.default.Component);

exports.default = TextArea;
(0, _defineProperty2.default)(TextArea, "propTypes", {
  prefixCls: _propTypes.default.string,
  autosize: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.shape({
    minRows: _propTypes.default.number,
    maxRows: _propTypes.default.number
  })])
});
(0, _defineProperty2.default)(TextArea, "defaultProps", {
  prefixCls: 'rw-input',
  autosize: false
});