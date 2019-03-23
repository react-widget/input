
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

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

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactWidgetIcon = _interopRequireDefault(require("react-widget-icon"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _Input = _interopRequireDefault(require("./Input"));

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