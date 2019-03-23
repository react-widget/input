import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash/omit';
import warning from 'warning';
import Icon from 'react-widget-icon';

function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

function shouldAffixWrapped(props) {
    return (props.prepend || props.append) && !!(props.prefix || props.suffix || props.allowClear);
}

const propTypes = {
    prefixCls: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    type: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object,
    prepend: PropTypes.node,
    append: PropTypes.node,
    allowClear: PropTypes.bool,
    //search: PropTypes.bool,
    //enterButton: PropTypes.any,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    maxLength: PropTypes.number,
};

export default class Input extends React.Component {
    static propTypes = propTypes

    static defaultProps = {
        prefixCls: 'rw-input',
        type: 'text',
        disabled: false,
    };

    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return {
                value: nextProps.value,
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
        this.state = {
            value,
        };
    }

    getSnapshotBeforeUpdate(prevProps) {
        if (shouldAffixWrapped(prevProps) !== shouldAffixWrapped(this.props)) {
            warning(
                this.input !== document.activeElement,
                'Input',
                `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change.`,
            );
        }
        return null;
    }

    // Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
    // We keep an empty function here.
    componentDidUpdate() { }

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    select() {
        this.input.select();
    }

    handleKeyDown = (e) => {
        const { onPressEnter, onKeyDown } = this.props;
        if (e.keyCode === 13 && onPressEnter) {
            onPressEnter(e);
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    }

    handleChange = (e) => {
        this.setValue(e.target.value, e);
    };

    componentDidMount() {
        if (this.props.autoFocus) {
            this.focus();
        }
    }

    getInputClassName() {
        const { prefixCls, size, disabled, inputClassName, prefix, suffix } = this.props;
        return classnames(prefixCls, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-with-prefix`]: prefix,
            [`${prefixCls}-with-suffix`]: suffix,
            [inputClassName]: inputClassName,
        });
    }

    saveInput = (input) => {
        this.input = input;
    }

    getInput() {
        return this.input;
    }

    renderInput() {
        return (
            <>
                {this.renderPrepend()}
                {this.renderIconInput()}
                {this.renderAppend()}
            </>
        );
    }


    renderIconInput() {
        const props = this.props;
        const {
            prefixCls,
            inputStyle,
            type,
            maxLength,
        } = props;

        const { value } = this.state;
        const otherProps = omit(props, Object.keys(propTypes));

        const Input = (
            <>
                {this.renderPrefixIcon()}
                <input
                    {...otherProps}
                    ref={this.saveInput}
                    type={type}
                    className={this.getInputClassName()}
                    style={inputStyle}
                    maxLength={maxLength}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    value={fixControlledValue(value)}
                />
                {this.renderSuffixIcon()}
            </>
        );

        if (!shouldAffixWrapped(props)) {
            return Input;
        }

        const affixWrapperCls = classnames(props.className, `${prefixCls}-affix-wrapper`, {
            [`${prefixCls}-affix-wrapper-${props.size}`]: props.size,
        });

        return (
            <span className={affixWrapperCls} style={props.style}>
                {Input}
            </span>
        );
    }

    renderPrepend() {
        const { prepend, prefixCls } = this.props;

        return prepend ?
            (
                <div className={`${prefixCls}-group-prepend`} >{prepend}</div>
            ) :
            null
    }

    renderAppend() {
        const { append, prefixCls } = this.props;

        return append ?
            (
                <div className={`${prefixCls}-group-append`} >{append}</div>
            ) :
            null
    }

    renderPrefixIcon() {
        const { prefixCls, prefix } = this.props;

        if (prefix) {
            return (
                <span className={`${prefixCls}-prefix`} >
                    {
                        typeof prefix === 'string' ? (
                            <Icon
                                type={prefix}
                                className={classnames({
                                    // [`${prefixCls}-icon`]: true,
                                    // [`${prefixCls}-icon-normal`]: true,
                                })}
                            />
                        ) : prefix
                    }
                </span >
            );
        }

        return null;

    }

    renderSuffixIcon() {
        const { prefixCls, suffix } = this.props;

        const clearIcon = this.renderClearIcon();

        if (suffix || clearIcon) {
            return (
                <span className={`${prefixCls}-suffix`}>
                    {
                        clearIcon ? clearIcon : (
                            typeof suffix === 'string' ? (
                                <Icon
                                    type={suffix}
                                    className={classnames({
                                        // [`${prefixCls}-icon`]: true,
                                        // [`${prefixCls}-icon-normal`]: true,
                                    })}
                                />
                            ) : suffix
                        )
                    }
                </span>
            );
        }

        return null;
    }

    renderClearIcon() {
        const { allowClear, disabled, prefixCls } = this.props;
        const { value } = this.state;
        if (!allowClear || disabled || value === undefined || value === null || value === '') {
            return null;
        }

        return (
            <Icon
                type="ios-close-circle"
                onClick={this.handleReset}
                className={classnames({
                    //  [`${prefixCls}-icon`]: true,
                    [`${prefixCls}-icon-clear`]: true,
                    //  [`${prefixCls}-icon-normal`]: true,
                })}
                role="button"
            />
        );
    }

    setValue(value, e, callback) {
        if (!('value' in this.props)) {
            this.setState({ value }, callback);
        }
        const { onChange } = this.props;
        if (onChange) {
            let event = e;
            if (e.type === 'click') {
                // click clear icon
                event = Object.create(e);
                event.target = this.input;
                event.currentTarget = this.input;
                const originalInputValue = this.input.value;
                // change input value cause e.target.value should be '' when clear input
                this.input.value = '';
                onChange('', event);
                // reset input value
                this.input.value = originalInputValue;
                return;
            }
            onChange(value, event);
        }
    }

    handleReset = (e) => {
        this.setValue('', e, () => {
            this.focus();
        });
    };

    getTextareaClassName() {
        const { prefixCls, disabled, inputCls } = this.props;
        return classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-disabled`]: disabled,
            [inputCls]: inputCls,
        });
    }

    getWrapperClassName() {
        const { prefixCls, className, size, prepend, append, search, enterButton } = this.props;
        return classnames({
            [className]: className,
            [`${prefixCls}-wrapper`]: true,
            [`${prefixCls}-wrapper-${size}`]: !!size,
            // [`${prefixCls}-type`]: this.type,
            [`${prefixCls}-group`]: prepend || append || (search && enterButton),
            [`${prefixCls}-group-size`]: (prepend || append || (search && enterButton)) && !!size,
            [`${prefixCls}-group-with-prepend`]: prepend,
            [`${prefixCls}-group-with-append`]: append || (search && enterButton),
            //[`${prefixCls}-hide-icon`]: append,
            [`${prefixCls}-with-search`]: (search && enterButton)
        });
    }

    render() {
        const { type, style } = this.props;

        return (
            <div
                className={this.getWrapperClassName()}
                style={style}
            >
                {
                    type === 'textarea' ?
                        this.renderTextarea() :
                        this.renderInput()
                }
            </div>
        );
    }

}