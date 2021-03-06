import React, { Component } from 'react';
import Icon from 'react-widget-icon';
import Input from '../../src/index';

function SearchInputs() {
    return (
        <div className="input-demo-wrapper">
            <Input.Search onSearch={s => alert(s)} placeholder="Enter something..." style={{
                width: 'auto'
            }} />
            <Input.Search enterButton onSearch={s => alert(s)} placeholder="Enter name" style={{
                width: 'auto'
            }} />
            <Input.Search enterButton="Search..." onSearch={s => alert(s)} placeholder="Enter name" style={{
                width: 'auto'
            }} />
            <Input.Search allowClear size="small" placeholder="Enter something..." style={{
                width: 400
            }} />
            <Input.Search allowClear enterButton size="small" placeholder="Enter name" style={{
                width: 400
            }} />
            <Input.Search allowClear enterButton="Search..." size="small" placeholder="Enter name" style={{
                width: 'auto'
            }} />
            <Input.Search size="large" placeholder="Enter something..." style={{
                width: 'auto'
            }} />
            <Input.Search enterButton size="large" placeholder="Enter name" style={{
                width: 'auto'
            }} />
            <Input.Search enterButton="Search..." size="large" placeholder="Enter name" style={{
                width: 'auto'
            }} />
        </div>
    );
}

export default class DEMO extends Component {

    render() {
        return (
            <div>
                <SearchInputs />
            </div >
        );
    }

}
