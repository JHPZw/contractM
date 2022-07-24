//合同管理页面渲染+GET请求

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Icon, Divider,Button,Select,Form,Dropdown,Menu,message } from 'antd';
import { Link } from 'react-router'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less' 
import { Input } from 'antd';
import axios from 'axios';
import {base} from '../../config/config.js';
const Option = Select.Option;
const FormItem = Form.Item;
const { Search } = Input;


const columns = [{
    title: '合同名称',
    dataIndex: 'contractName',
    key: 'contractName',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  }, {
    title: '创建时间',
    dataIndex: 'contractDate',
    key: 'contractDate',
  }, {
    title: '生效日期',
    dataIndex: 'effectiveDate',
    key: 'effectiveDate',
  }, {
    title: '截止日期',
    dataIndex: 'deadline',
    key: 'deadline',
  },{
    title: '合同声明',
    dataIndex: 'contractStatement',
    key: 'contractStatement',
  },{
	
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="link" id="previewC"><a href={record.pdfUrl} >预览</a></Button>
        <Divider type="vertical" />
        <Button type="link" id="deleteC" onClick={()=>{
        	console.log(record.id);
        	axios.delete(`${base}/contracts/${record.id}`,)
        	.then(response => {
        		//console.log(response)
        		window.location.reload()
        		}).catch(function (error){
        		console.log(error);
        		});
        }} >删除</Button>
        <Divider type="vertical" />
      </span>
    ),
  }];
  
  

export default class TabbleDemo1 extends React.Component {
    constructor (props) {
        super(props)
		this.state={
			listC:[]
		}
    }

	onSearch = (value)=>{
		console.log(value);
		console.log(this.state);
		axios.get(`${base}/contracts/search/${value}`,
		).then(response => {
								console.log(response);
								console.log(response.data);
								this.setState({
									listC:response.data
								})
							 }).catch(function (error){
								console.log(error);
							 });
	}

	componentDidMount(){//模板管理页面内容get
		 axios(
		 {
			 method:'GET',
			 url:`${base}/contracts`,
			 async:false,
		 }).then(
			response =>{
				console.log(response.data)
				// console.log(response.data[0].creationDate)
				const listC = response.data;
				this.setState({
					listC:listC
				})
				// console.log(this.state.list)
			},
			error =>{
				console.log(error)
			}
		 )
	}

    render () {
        return (
            <div>
				<Search placeholder="名称/创建人/声明" onSearch={this.onSearch} maxLength="100" enterButton size='large' style={{width:'40%'}} id="searchC"/>
				<Select defaultValue="m1" style={{left:'10%'}} enterButton size='large'>
				    <Option value="m1">所有合同</Option>
				    <Option value="m2">合同类型1</Option>
				    <Option value="m3">合同类型2</Option>
					<Option value="m4">合同类型3</Option>
				</Select>
                <Table columns={columns} dataSource={this.state.listC} />
				<Button type="primary" id="newC"><Link to ="/formC">新建合同</Link></Button>
            </div>
        )
    }
}