
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _create = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/create"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames9 = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _warning = _interopRequireDefault(require("warning"));

var _reactWidgetIcon = _interopRequireDefault(require("react-widget-icon"));

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