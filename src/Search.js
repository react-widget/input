import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'react-widget-icon';
import Input from './Input';


const propTypes = {
    prefixCls: PropTypes.string,
    enterButton: PropTypes.any,
};

export default class Search extends React.Component {
    static propTypes = propTypes;

    static defaultProps = {
        prefixCls: 'rw-input',
        enterButton: false,
    };

    onSearch = (e) => {
        const { onSearch } = this.props;
        if (onSearch) {
            onSearch(this.input.input.value, e);
        }
        this.input.focus();
    };

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    saveInput = (node) => {
        this.input = node;
    };

    render() {
        const {
            prefixCls,
            enterButton,
            className,
            onSearch,
            ...restProps
        } = this.props;

        const inputClassName = classnames(className, {
            [`${prefixCls}-with-search`]: true,
        });
        let suffix, append;

        if (enterButton === false) {
            suffix = "ios-search";
        } else {
            append = enterButton === true ? (
                <Icon
                    type="ios-search"
                    className={`${prefixCls}-icon-search`}
                />
            ) : enterButton;
        }

        return (
            <Input
                onPressEnter={this.onSearch}
                {...restProps}
                prefixCls={prefixCls}
                className={inputClassName}
                ref={this.saveInput}
                suffix={suffix}
                suffixProps={{
                    onClick: this.onSearch
                }}
                append={append}
                appendProps={{
                    onClick: this.onSearch
                }}
            />
        );
    };
}
