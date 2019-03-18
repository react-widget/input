import React, { Component } from 'react';
import {
    Layout,
    Header,
    Content,
    Footer,
    Sider
} from '../../src/index';


export default class DEMO extends Component {

    render() {
        return (
            <div>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
                <br />
                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Sider>Sider</Sider>
                        <Content>Content</Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
                <br />
                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Content>Content</Content>
                        <Sider>Sider</Sider>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
                <br />
                <Layout>
                    <Sider>Sider</Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div >
        );
    }

}
