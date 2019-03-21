import React, { Component } from 'react';
import Input from '../../src/index';

export default class DEMO extends Component {

    render() {
        return (
            <div>
                <Input size="small" placeholder="small size" />
                <Input />
                <Input size="large" />
                <Input size="large" disabled placeholder="small large" value="test..." />
                <Input prefix="ios-contact" placeholder="Enter name" style={{
                    width: 'auto'
                }} />
                <Input suffix="ios-search" placeholder="Enter text" style={{
                    width: 'auto'
                }} />
                <div>
                    <Input search placeholder="Enter something..." />
                    <Input search enterButton placeholder="Enter something..." />
                    <Input search enterButton="Search" placeholder="Enter something..." />
                </div>
            </div >
        );
    }

}
