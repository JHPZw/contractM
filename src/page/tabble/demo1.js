//模板管理页面渲染+GET请求数据

import React, { Component } from 'react';
import { Table, Divider , Button,Select} from 'antd';
import { Link } from 'react-router'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less' 
import { Input } from 'antd';
import axios from 'axios';
import {base} from '../../config/config.js';

const Option = Select.Option;
const { Search } = Input;

const columns = [{
    title: '模板名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  }, {
    title: '创建时间',
    dataIndex: 'creationDate',
    key: 'creationDate',
  },{
    title: '模板声明',
    dataIndex: 'statement',
    key: 'statement',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="link" id="create" ><a href={"/tabbleC#/formC?templateId="+record.id} >生成合同</a></Button>
        <Divider type="vertical" />
        <Button type="link" id="preview"><a href={record.pdfUrl} >预览</a></Button>
        <Divider type="vertical" />
        <Button type="link" id="delete" onClick={()=>{
			console.log(record.id);
			axios.delete(`${base}/templates/${record.id}`,)
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
			// name:'',
			// creator:'',
			// statement:'',
			// type:'',
			// creationDate:'',
			// id:'',
			// pdfUrl:'',
			list:[]
		};
		this.onSearch = this.onSearch.bind(this);
    }
	
	onSearch = (value)=>{
		console.log(value);
		console.log(this.state);
		axios.get(`${base}/templates/search/${value}`,
		).then(response => {
								this.setState({
									list:response.data
								})
							 }).catch(function (error){
								console.log(error);
							 });
	}
	
	
 componentDidMount(){//模板管理页面内容get
	 axios(
	 {
		 method:'GET',
		 url:`${base}/templates`,
		 async:false,
	 }).then(
		response =>{
			console.log(response.data)
			// console.log(response.data[0].creationDate)
			const list = response.data;
			this.setState({
				list:list
			})
			//console.log(this.state.list)
		},
		error =>{
			console.log(error)
		}
	 )
 }

    render () {
        return (
            <div>
				<Search placeholder="名称/创建人/声明"  onSearch={this.onSearch} maxLength="100" enterButton size='large' style={{width:'40%'}} id="search" />
				
				<Select defaultValue="m1" style={{left:'10%'}} enterButton size='large' >
				    <Option value="m1">所有模板</Option>
				    <Option value="m2">模板类型1</Option>
				    <Option value="m3">模板类型2</Option>
					<Option value="m4">模板类型3</Option>
				</Select>
                <Table  columns={columns} dataSource={this.state.list} />
				<Button type="primary" id="new"><Link to ="/form">新建模板</Link></Button>
            </div>
        )
    }
}