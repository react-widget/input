import React, { Component } from 'react';
import Icon from 'react-widget-icon';
import Input from '../../src/index';

function IconInputs() {

    return (
        <div className="input-demo-wrapper">
            <Input />
            <Input prepend="http://" />
            <Input append=".com" />
            <Input allowClear prepend="http://" />
            <Input allowClear append=".com" />
            <Input
                allowClear
                prepend="http://"
                append=".com"
                prefix={<Icon type="ios-contact" />}
                suffix={<Icon type="ios-contact" />}
            />
            <Input
                allowClear
                disabled
                prepend="http://"
                append=".com"
                prefix={<Icon type="ios-contact" />}
                suffix={<Icon type="ios-contact" />}
            />
            <Input
                size="small"
                allowClear
                prepend="http://"
                append=".com"
                prefix={<Icon type="ios-contact" />}
                suffix={<Icon type="ios-contact" />}
            />
            <Input
                size="large"
                allowClear
                prepend="http://"
                append=".com"
                prefix={<Icon type="ios-contact" />}
                suffix={<Icon type="ios-contact" />}
            />
            <Input
                allowClear
                append=".com"
                autoFocus
                onPressEnter={() => alert('enter')}
                prefix={<Icon type="ios-contact" />}
                suffix={<Icon type="ios-contact" />}
            />
            <Input
                allowClear
                prepend="http://"
                prefix={<Icon type="ios-contact" />}
                suffix={<Icon type="ios-contact" />}
            />
            <Input prefix={<Icon type="ios-contact" />} readOnly size="small" placeholder="small size" />
            <Input prefix={<Icon type="ios-contact" />} allowClear />
            <Input prefix={<Icon type="ios-contact" />} allowClear size="large" />
            <Input allowClear size="large" disabled placeholder="small large" value="test..." />
            <Input size="small" prefix={<Icon type="ios-contact" />} suffix={<Icon type="ios-contact" />} placeholder="Enter name" style={{
                width: 'auto'
            }} />
            <Input prefix={<Icon type="ios-contact" />} suffix={<Icon type="ios-contact" />} placeholder="Enter name" style={{
                width: 'auto'
            }} />
            <Input size="large" prefix={<Icon type="ios-contact" />} suffix={<Icon type="ios-contact" />} placeholder="Enter name" style={{
                width: 'auto'
            }} />
        </div>
    );
}

function SearchInputs() {
    return (
        <div className="input-demo-wrapper">
            <Input search placeholder="Enter something..." style={{
                width: 'auto'
            }} />
            <Input search enterButton icon="ios-arrow-down" placeholder="Enter name" style={{
                width: 'auto'
            }} />
            <Input search enterButton="Search..." icon="ios-arrow-down" placeholder="Enter name" style={{
                width: 'auto'
            }} />
            <Input icon="ios-arrow-down" placeholder="Enter name" style={{
                width: 'auto'
            }} />
        </div>
    );
}

export default class DEMO extends Component {

    render() {
        return (
            <div>
                <IconInputs />
            </div >
        );
    }

}
