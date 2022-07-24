//sider侧边导航栏

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { browserHistory,  Link } from 'react-router'  //引入路由函数

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Sider extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			key: 1
		}
	}
    handleClick = (e) => {
		console.log(e)
		this.props.getValue(e.key,e.item.props.children); 
	}
    render () {
				return (
					<Menu
						onClick={this.handleClick}
						onChange = {this.getValue}
						style={{ width: 256,height:'90vh',overflow: 'auto',minWidth:256}}
						defaultSelectedKeys={['1']}
						defaultOpenKeys = {['sub1','sub2','sub3']}
						mode="inline"
					>

						<SubMenu key="sub1" title={<span><Icon type="smile-o" /><span>模板管理</span></span>}>
								<Menu.Item key="1">
									<Link to = {'tabble'}>模板管理</Link> 
								</Menu.Item>
								<Menu.Item key="2">
									<Link to = {'form'}>模板创建</Link> 
								</Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" title={<span><Icon type="smile-o" /><span>合同管理</span></span>}>
							<Menu.Item key="3">
								<Link to = {'tabbleC'}>合同管理</Link>
							</Menu.Item>
							<Menu.Item key="4">
								<Link to = {'formC'}>合同创建</Link>
							</Menu.Item>
						</SubMenu>
					</Menu>
				);
			}
  }