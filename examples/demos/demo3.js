import React, { Component } from 'react';
import Input from '../../src/index';

function SearchInputs() {
    return (
        <div className="input-demo-wrapper">
            <Input.TextArea allowClear prepend="http://" inputStyle={{
                height: 80
            }} />
            <Input.TextArea autosize />
            <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />
            <Input.TextArea inputStyle={{
                height: 80,
                resize: 'none'
            }}/>
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
