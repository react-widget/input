import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'react-widget-icon';
import omit from 'lodash/omit';
import Input from './Input';

function fixControlledValue(value) {
    if (value == null) {
        return '';
    }
    return value;
}

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
                append={append}
            />
        );

        // if (enterButton === true) {
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
    };
}
