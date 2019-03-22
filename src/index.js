import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'react-widget-icon';
import omit from 'lodash/omit';

function fixControlledValue(value) {
    if (value == null) {
        return '';
    }
    return value;
}

const propTypes = {
    prefixCls: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default', 'large', '']),
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string, //text textarea
    inline: PropTypes.bool,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    inputCls: PropTypes.string,
    inputStyle: PropTypes.object,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    icon: PropTypes.string,
    prepend: PropTypes.node,
    append: PropTypes.node,
    search: PropTypes.bool,
    enterButton: PropTypes.any,
    clearable: PropTypes.bool,
    maxLength: PropTypes.number,
};

export default class Input extends React.Component {
    static propTypes = propTypes

    static defaultProps = {
        prefixCls: 'rw-input',
        disabled: false,
        autoComplete: 'off',
        type: 'text',
        inline: true,
        size: '',
        prefix: '',
        suffix: '',
        enterButton: false,
    };

    focus() {
        this._input && this._input.focus();
    }

    blur() {
        this._input && this._input.blur();
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
        const { onChange } = this.props;

        if (onChange) {
            onChange(e.target.value);
        }
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            this.focus();
        }
    }

    getInputClassName() {
        const { prefixCls, size, disabled, inputCls, prefix, suffix } = this.props;
        return classnames(prefixCls, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-with-prefix`]: prefix !== '',
            [`${prefixCls}-with-suffix`]: suffix !== '',
            [inputCls]: inputCls,
        });
    }

    saveInput = (input) => {
        this._input = input;
    }

    getInput() {
        return this._input;
    }

    renderInput() {
        const props = this.props;
        const {
            inputStyle,
            type,
        } = props;

        const otherProps = omit(props, Object.keys(propTypes));

        if ('value' in props) {
            otherProps.value = fixControlledValue(props.value);

            delete otherProps.defaultValue;
        }

        return this.wrapInput(
            <input
                {...otherProps}
                ref={this.saveInput}
                type={type}
                style={inputStyle}
                onChange={this.handleChange}
                className={this.getInputClassName()}
                onKeyDown={this.handleKeyDown}
            />
        );
    }

    renderPrepend() {
        const { prepend, prefixCls } = this.props;

        return prepend ?
            (
                <div className={`${prefixCls}-group-prepend`} >${prepend}</div>
            ) :
            null
    }

    renderAppend() {
        const { append, prefixCls } = this.props;

        return append ?
            (
                <div className={`${prefixCls}-group-append`} >${append}</div>
            ) :
            null
    }

    renderPrefixIcon() {
        const { prefixCls, disabled, prefix } = this.props;
    }

    renderSuffixIcon() {
        const { clearable, prefixCls, disabled, value, icon, search, enterButton, append } = this.props;
    }

    getTextareaClassName() {
        const { prefixCls, disabled, inputCls } = this.props;
        return classnames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-disabled`]: disabled,
            [inputCls]: inputCls,
        });
    }

    renderTextarea() {
        const props = this.props;
        const {
            inputStyle,
            style = {}
        } = this.props;

        const otherProps = omit(props, Object.keys(propTypes));

        if ('value' in props) {
            otherProps.value = fixControlledValue(props.value);

            delete otherProps.defaultValue;
        }

        const { height } = style;

        return this.wrapInput(
            <textarea
                {...otherProps}
                ref={this.saveInput}
                style={{
                    height,
                    ...inputStyle
                }}
                className={this.getTextareaClassName()}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
            />
        );
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
            [`${prefixCls}-hide-icon`]: append,
            [`${prefixCls}-with-search`]: (search && enterButton)
        });
    }

    wrapInput(input) {
        const {
            prefixCls,
            className,
            style = {},
            append,
            prepend,
            search,
            enterButton,
            prefix,
            suffix,
        } = this.props;

        return (
            <div
                className={this.getWrapperClassName()}
                style={style}
            >
                {
                    prepend ? (
                        <div className={`${prefixCls}-group-prepend`} >${prepend}</div>
                    ) : null
                }
                {
                    suffix !== '' ? (
                        <span className="rw-input-suffix">
                            <Icon type={suffix} />
                        </span >
                    ) : null
                }
                {input}
                {
                    append ? (
                        <div className={`${prefixCls}-group-append`} >${append}</div>
                    ) : null
                }
                {
                    search && enterButton ? (
                        <div
                            className={`${prefixCls}-group-append ${prefixCls}-search`}
                            onClick={this.handleSearch}
                        >
                            {
                                enterButton ? (
                                    <Icon type="ios-search" />
                                ) : enterButton
                            }
                        </div >
                    ) : null
                }
                {
                    prefix !== '' ? (
                        <span className="rw-input-prefix">
                            <Icon type={prefix} />
                        </span >
                    ) : null
                }

            </div >
        );
    }

    render() {
        if (this.props.type === 'textarea') {
            return this.renderTextarea();
        }
        return this.renderInput();
    }

}