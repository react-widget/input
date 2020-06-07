import React from "react";
import classnames from "classnames";
import { fixControlledValue } from "./Input";
export default class TextArea extends React.Component {
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
    focus() {
        this.inputRef.current?.focus();
    }
    blur() {
        this.inputRef.current?.blur();
    }
    select() {
        this.inputRef.current?.select();
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
    getInput() {
        return this.inputRef.current;
    }
    render() {
        const { prefixCls, className, disabled, readOnly, onChange, ...restProps } = this.props;
        return (React.createElement("textarea", Object.assign({}, restProps, { ref: this.inputRef, disabled: disabled, readOnly: readOnly, onChange: this.handleChange, onKeyDown: this.handleKeyDown, value: fixControlledValue(this.state.value), className: classnames(prefixCls, {
                [className]: className,
                [`${prefixCls}-disabled`]: !!disabled,
                [`${prefixCls}-readonly`]: !!readOnly,
            }) })));
    }
}
TextArea.defaultProps = {
    prefixCls: "rw-input",
    defaultValue: "",
};
