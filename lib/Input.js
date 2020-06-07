import React from "react";
import classnames from "classnames";
import omit from "lodash/omit";
import warning from "warning";
import TextArea from "./TextArea";
export function fixControlledValue(value) {
    if (typeof value === "undefined" || value === null) {
        return "";
    }
    return value;
}
function shouldAffixWrapped(props) {
    return !!(props.prefix || props.suffix);
}
export default class Input extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: this.props.defaultValue,
        };
        this.inputRef = React.createRef();
        this.handleKeyDown = (e) => {
            const { onPressEnter, onKeyDown } = this.props;
            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        this.handleChange = (e) => {
            this.setValue(e.target.value, e);
        };
    }
    static getDerivedStateFromProps(nextProps, state) {
        return {
            value: nextProps.value === undefined ? state.value : nextProps.value,
        };
    }
    getSnapshotBeforeUpdate(prevProps) {
        if (shouldAffixWrapped(prevProps) !== shouldAffixWrapped(this.props)) {
            warning(this.inputRef.current !== document.activeElement, "Input", `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change.`);
        }
        return null;
    }
    // Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
    // We keep an empty function here.
    componentDidUpdate() { }
    focus() {
        this.inputRef.current?.focus();
    }
    blur() {
        this.inputRef.current?.blur();
    }
    select() {
        this.inputRef.current?.select();
    }
    componentDidMount() { }
    getInput() {
        return this.inputRef.current;
    }
    renderPrepend() {
        const { prepend, prependProps, prefixCls } = this.props;
        return prepend ? (React.createElement("div", Object.assign({}, prependProps, { className: classnames(`${prefixCls}-prepend`, prependProps?.className) }), prepend)) : null;
    }
    renderAppend() {
        const { append, appendProps, prefixCls } = this.props;
        return append ? (React.createElement("div", Object.assign({}, appendProps, { className: classnames(`${prefixCls}-append`, appendProps?.className) }), append)) : null;
    }
    renderPrefix() {
        const { prefixCls, prefix, prefixProps } = this.props;
        return prefix ? (React.createElement("div", Object.assign({}, prefixProps, { onMouseDown: (e) => {
                prefixProps?.onMouseDown?.(e);
                e.preventDefault();
            }, onMouseUp: (e) => {
                prefixProps?.onMouseDown?.(e);
                e.preventDefault();
            }, onClick: (e) => {
                prefixProps?.onClick?.(e);
                this.focus();
            }, className: classnames(`${prefixCls}-prefix`, prefixProps?.className) }), prefix)) : null;
    }
    renderSuffix() {
        const { prefixCls, suffix, suffixProps } = this.props;
        return suffix ? (React.createElement("div", Object.assign({}, suffixProps, { onMouseDown: (e) => {
                suffixProps?.onMouseDown?.(e);
                e.preventDefault();
            }, onMouseUp: (e) => {
                suffixProps?.onMouseUp?.(e);
                e.preventDefault();
            }, onClick: (e) => {
                suffixProps?.onClick?.(e);
                this.focus();
            }, className: classnames(`${prefixCls}-suffix`, suffixProps?.className) }), suffix)) : null;
    }
    setValue(newValue, e, callback) {
        const { onChange, value } = this.props;
        if (value === undefined) {
            this.setState({ value: newValue }, callback);
        }
        if (onChange) {
            onChange(newValue, e);
        }
    }
    renderInput() {
        const props = this.props;
        const { prefixCls, type, size, disabled, readOnly, inputClassName, inputStyle, renderer, } = props;
        const { value } = this.state;
        const prefix = this.renderPrefix();
        const suffix = this.renderSuffix();
        const inputCls = classnames(prefixCls, {
            [`${prefixCls}-${size}`]: size !== "default",
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-readonly`]: readOnly,
        }, inputClassName);
        const restProps = omit(props, [
            "prefixCls",
            "style",
            "className",
            "prepend",
            "prependProps",
            "append",
            "appendProps",
            "defaultValue",
            "value",
            "size",
            "prefix",
            "prefixProps",
            "suffix",
            "suffixProps",
            "onPressEnter",
            "onChange",
            "inputClassName",
            "inputStyle",
            "renderer",
        ]);
        const inputProps = {
            ...restProps,
            ref: this.inputRef,
            type,
            className: inputCls,
            style: inputStyle,
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown,
            value: fixControlledValue(value),
        };
        const Input = (React.createElement(React.Fragment, null,
            prefix,
            renderer ? renderer(inputProps) : React.createElement("input", Object.assign({}, inputProps)),
            suffix));
        if (!prefix && !suffix) {
            return Input;
        }
        const affixWrapperCls = classnames(props.className, `${prefixCls}-affix-wrapper`, {
            [`${prefixCls}-affix-wrapper-${props.size}`]: props.size,
        });
        return (React.createElement("div", { className: affixWrapperCls, style: props.style }, Input));
    }
    render() {
        const { prefixCls, className, size, prepend, append, style } = this.props;
        const classes = classnames({
            [className]: className,
            [`${prefixCls}-wrapper`]: true,
            [`${prefixCls}-wrapper-${size}`]: size !== "default",
            [`${prefixCls}-with-prepend`]: prepend,
            [`${prefixCls}-with-append`]: append,
        });
        return (React.createElement("div", { className: classes, style: style },
            this.renderPrepend(),
            this.renderInput(),
            this.renderAppend()));
    }
}
Input.defaultProps = {
    prefixCls: "rw-input",
    type: "text",
    disabled: false,
    defaultValue: "",
};
Input.TextArea = TextArea;
