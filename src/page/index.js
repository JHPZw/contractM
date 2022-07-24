//Header+Footer部分

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Layout, Row, Col, Avatar, Input, Menu, Dropdown, Icon, Badge } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

import SiderComponent from './sider'

const { Header, Footer, Sider, Content } = Layout;


export default class Demo1 extends Component {
    getValue (val, value) {
        this.setState({
            value: val,
            valueTxt: value
        })
    }

    render () {
        return (
            <div style={{ minWidth: '1000px' }}>
                <Layout>
                    <Header style={{ backgroundColor:'#fff',color: '#000', textAlign: 'center', fontWeight: '900' }}>
                        <Row>
                            <Col span={4}>
                                智能合同系统
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Sider style={{ color: '#fff' }}>
                            <SiderComponent
                                getValue={this.getValue.bind(this)}
                            />
                        </Sider>
                        <Content style={{ marginLeft: '5%', height: '86vh', paddingRight: '2%', overflow: 'auto', textAlign: 'center' }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                    <Footer style={{ backgroundColor: '#fff', position: 'fixed', bottom: 0, width: '100vw', height:'20px' ,minWidth: '1000px', textAlign: 'center', fontWeight: 'bold', color: '#000' }}>
                        智能合同系统_新安怀
                    </Footer>
                </Layout>
            </div>
        )
    }
}
