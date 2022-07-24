//合同创建页面渲染

import React from 'react'  
import { render } from 'react-dom' 
import {Link} from 'react-router'
import axios from 'axios';
import {base} from '../../config/config.js';
import { Form, Input, Tooltip, notification ,DatePicker,Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const close = () => {
  console.log(
    '提示信息已关闭',
  );
  //window.location.href="/tabbleC#/tabbleC";
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" id="closeC" size="small" onClick={() => notification.close(key)}>
      关闭
    </Button>
  );
  notification.open({
    message: '提示信息',
    description:
      '创建信息已提交！',
    btn,
    key,
    onClose: close,
  });
};

class RegistrationForm extends React.Component {
  
  constructor(props){
	  super(props);
	  this.state={
		  para:{
			  paraName :'' ,
			  paraType :'',
			  paraContent :''
		  },
		  paras:[],
		confirmDirty: false,
		autoCompleteResult: [],
		componnetArray:[1],
	  }
  }
  
  componentDidMount(){//模板管理页面内容get
	let str = window.location.href;
	let id = str.substr(str.lastIndexOf("=")+1);
  	 axios(
  	 {
  		 method:'GET',
  		 url:`${base}/templates/${id}`,
  		 async:false,
  	 }).then(
  		response =>{
  			//console.log(response.data)
			this.setState({
				paras:response.data,
			})
			//console.log(this.state.paras);
  		},
  		error =>{
  			console.log(error)
  		}
  	 )
  }
  
  addComponent = () => {
      let arr = [...this.state.componnetArray];
      arr.push(1);
      this.setState({
          componnetArray: arr
      })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
		  console.log(values);
        //console.log('Received values of form: ', values);
		const data={
			"contract": {
				"contractName": values.contractName, 
				"templateId": 0, 
				"contractType": values.contractType, 
				"contractStatement": values.contractStatement, 
				"effectiveDate": values.effectiveDate, 
				"deadline": values.deadline, 
				"contractDate": values.contractDate,
				 "reviseDate": "2022-06-16", 
				"creator": values.creator, 
				"revise": "String", 
				"pdfUrl": "String" 
				}, 
				"contractParas": [100] 
				};
				for(let j = 0; j<this.state.paras.length;j++){
					data.contractParas[j] = new Object();
					data.contractParas[j].paraName = this.state.paras[j].paraName;
					data.contractParas[j].paraType = this.state.paras[j].paraType;
					data.contractParas[j].paraContent = this.state.paras[j].paraContent;
				}
				for(let i=this.state.paras.length;i<this.state.componnetArray.length+this.state.paras.length;i++){
					data.contractParas[i] = new Object();
					data.contractParas[i].paraName=values.paraName[i-this.state.paras.length];
					data.contractParas[i].paraType=values.paraType[i-this.state.paras.length];
					data.contractParas[i].paraContent=values.paraContent[i-this.state.paras.length];
				}
		axios.post(`${base}/contracts`,data).then(function (response){
								console.log(response);
							 }).catch(function (error){
								console.log(error);
							 });
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

	
	
	
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
	const config = {
	  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
	};
    return (
        <div style={{paddingRight:'20%'}}>
            <Form onSubmit={this.handleSubmit}>
				<FormItem
				{...formItemLayout}
				label={(
				    <span>
				    合同创建人&nbsp;
				    </span>
				)}
				>
				{getFieldDecorator('creator', {
				    rules: [{ required: true, message: '请输入合同创建人名称！', whitespace: true }],
				})(
				    <Input placeholder="合同创建人" id="creator"/>
				)}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label={(
				    <span>
				    合同名称&nbsp;
				    </span>
				)}
				>
				{getFieldDecorator('contractName', {
				    rules: [{ required: true, message: '请输入合同名称！', whitespace: true }],
				})(
				    <Input placeholder="合同名称" id="contractNameC"/>
				)}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label={(
				    <span>
				    合同声明&nbsp;
				    </span>
				)}
				>
				{getFieldDecorator('contractStatement', {
				    rules: [{ required: true, message: '请输入合同声明！', whitespace: true }],
				})(
				    <Input placeholder="合同声明" id="contractStatementC"/>
				)}
				</FormItem>
				<FormItem {...formItemLayout} label="合同类型选择">
					{getFieldDecorator('contractType', {
					    rules: [{ required: true, message: '请输入合同类型！', whitespace: true }],
					})(
					    <Select placeholder="请选择合同类型" id="TypeC">
					    	<Option value="1">合同类型1</Option>
					    	<Option value="2">合同类型2</Option>
					    	<Option value="3">合同类型3</Option>
					    </Select>
					)}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="合同创建时间"
				>
				{getFieldDecorator('contractDate', config)(
				    <DatePicker id="contractDateC" />
				)}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="合同生效时间"
				>
				{getFieldDecorator('effectiveDate', config)(
				    <DatePicker id="effectiveDateC"/>
				)}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="合同截止时间"
				>
				{getFieldDecorator('deadline', config)(
				    <DatePicker id="deadlineC"/>
				)}
				</FormItem>
				<div >
					{this.state.paras.map((item,index)=> 
					<div key={index}>
					
					<FormItem 
					{...formItemLayout}
					label={(
					    <span>
					    参数名称&nbsp;
					    </span>
					)}
					>
					
					    <Input placeholder="参数名称" id="paraNameC" value={item.paraName}/>
					
					</FormItem>
					<FormItem {...formItemLayout} label="参数类型选择">
						
						    <Select placeholder="请选择参数类型" id="paraTypeC" value={item.paraType} >
						    	<Option value="number">数字</Option>
						    	<Option value="date">日期</Option>
						    	<Option value="string">文本</Option>
						    </Select>
						
					</FormItem>
					<FormItem
					{...formItemLayout}
					label={(
					    <span>
					    参数内容&nbsp;
					    </span>
					)}
					>
					
					    <Input placeholder="参数内容/日期格式：YYYY-MM-DD" id="paraContentC" value={item.paraContent}/>
					</FormItem>
					</div> 
					)}
				</div>
				<div >
					{this.state.componnetArray.map((item,index)=> 
					<div key={index}>
					
					<FormItem 
					{...formItemLayout}
					label={(
					    <span>
					    参数名称&nbsp;
					    </span>
					)}
					>
					{getFieldDecorator(`paraName[${index}]`, {
					    rules: [{ required: true, message: '请输入参数名称！', whitespace: true }],
					})(
					    <Input placeholder="参数名称" id="paraNameC" />
					)}
					</FormItem>
					<FormItem {...formItemLayout} label="参数类型选择">
						{getFieldDecorator(`paraType[${index}]`, {
						    rules: [{ required: true, message: '记得选啊！', whitespace: true }],
						})(
						    <Select placeholder="请选择参数类型" id="paraTypeC"  >
						    	<Option value="number">数字</Option>
						    	<Option value="date">日期</Option>
						    	<Option value="string">文本</Option>
						    </Select>
						)}
					</FormItem>
					<FormItem
					{...formItemLayout}
					label={(
					    <span>
					    参数内容&nbsp;
					    </span>
					)}
					>
					{getFieldDecorator(`paraContent[${index}]`, {
					    rules: [{ required: true, message: '请输入参数内容！', whitespace: true }],
					})(
					    <Input placeholder="参数内容/日期格式：YYYY-MM-DD" id="paraContentC"/>
					)}
					</FormItem>
					</div> 
					)}
					
					<Button type="link" style={{left:'17%'}} id="newC" onClick={this.addComponent}>新增参数</Button>
				</div>
                <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" style={{right:'30%'}} id="submitC" onClick={openNotification} >确定</Button>
				<Button type="default" style={{left:'30%'}} id="defaultC"><Link to ="/tabbleC">取消</Link></Button>
                </FormItem>
            </Form>
        </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;