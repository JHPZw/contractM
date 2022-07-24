//模板创建页面渲染

import React from 'react'  
import { render } from 'react-dom' 
import { Link } from 'react-router'
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
  window.location.href="/tabbleC#/tabble";
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" id="close" size="small" onClick={() => notification.close(key)}>
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
	constructor (props) {
	    super(props)
		this.state={
			template:{
				statement:"" ,
				name:"", 
				type:"", 
				creationDate:"", 
				creator:""
			},
			confirmDirty: false,
			autoCompleteResult: [],
			componnetArray:[1],
		}
	}
	
	addComponent = () => {
	    let arr = [...this.state.componnetArray];
	    arr.push(1);
	    this.setState({
	        componnetArray: arr
	    })
	}
	
  /*state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
		  //console.log(values);
		const data={
				"template": {
				"statement": values.statement, 
				"name": values.name, 
				"type": values.type, 
				"creationDate": values.creationDate, 
				"creator": values.creator 
				}, 
				"templateParas": [100] 
			};
			data.templateParas[0] = new Object();
			data.templateParas[1] = new Object();
			data.templateParas[0].paraName="甲方";
			data.templateParas[1].paraName="乙方";
			data.templateParas[0].paraType="string";
			data.templateParas[1].paraType="string";
			data.templateParas[0].paraContent=values.partA;
			data.templateParas[1].paraContent=values.partB;
		for(let i=0;i<this.state.componnetArray.length;i++){
			data.templateParas[i+2] = new Object();
			data.templateParas[i+2].paraName=values.paraName[i];
			data.templateParas[i+2].paraType=values.paraType[i];
			data.templateParas[i+2].paraContent=values.paraContent[i];
		}
		//console.log(data);
        //console.log('Received values of form: ', values);
		//console.log(values.name);
		axios.post(`${base}/templates`,data,).then(function (response){
								console.log(response);
							 }).catch(function (error){
								console.log(error);
							 });
      }
    });
  }
  handleName = (e) => {
	  this.setState(
	  {
		  name:e.target.value
	  })
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
	const prefixSelectorr = getFieldDecorator('prefix', {
	  initialValue: '1',
	});

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
                    甲方&nbsp;
                    </span>
                )}
                >
                {getFieldDecorator('partA', {
                    rules: [{ required: true, message: '请输入甲方名称！', whitespace: true }],
                })(
                    <Input placeholder="甲方名称" id="partAa" />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label={(
                    <span>
                    乙方&nbsp;
                    </span>
                )}
                >
                {getFieldDecorator('partB', {
                    rules: [{ required: true, message: '请输入乙方名称！', whitespace: true }],
                })(
                    <Input placeholder="乙方名称" id="partBa"/>
                )}
                </FormItem>
				<FormItem
				{...formItemLayout}
				label={(
				    <span>
				    模板创建人&nbsp;
				    </span>
				)}
				>
				{getFieldDecorator('creator', {
				    rules: [{ required: true, message: '请输入模板创建人名称！', whitespace: true }],
				})(
				    <Input placeholder="模板创建人" id="creatora" />
				)}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label={(
				    <span>
				    模板名称&nbsp;
				    </span>
				)}
				>
				{getFieldDecorator('name', {
				    rules: [{ required: true, message: '请输入模板名称！', whitespace: true }],
				})(
				    <Input placeholder="模板名称" id="namea"/>
				)}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label={(
				    <span>
				    模板声明&nbsp;
				    </span>
				)}
				>
				{getFieldDecorator('statement', {
				    rules: [{ required: true, message: '请输入模板声明！', whitespace: true }],
				})(
				    <Input placeholder="模板声明" id="statementa"/>
				)}
				</FormItem>
				<FormItem
				{...formItemLayout}
				label="模板创建时间"
				>
				{getFieldDecorator('creationDate', config)(
				    <DatePicker id="creationDatea"/>
				)}
				</FormItem>
				<FormItem {...formItemLayout} label="模板类型选择">
					{getFieldDecorator('type', {
					    rules: [{ required: true, message: '请选择模板类型！', whitespace: true }],
					})(
					    <Select placeholder="请选择模板类型" id="typea">
					    	<Option value="1">模板类型1</Option>
					    	<Option value="2">模板类型2</Option>
					    	<Option value="3">模板类型3</Option>
					    </Select>
					)}
				</FormItem>
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
				    <Input placeholder="参数名称" id="paraNamea" />
				)}
				</FormItem>
				<FormItem {...formItemLayout} label="参数类型选择">
					{getFieldDecorator(`paraType[${index}]`, {
					    rules: [{ required: true, message: '！', whitespace: true }],
					})(
					    <Select placeholder="请选择参数类型" id="paraTypea">
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
				    <Input placeholder="参数内容/日期格式：YYYY-MM-DD" id="paraContenta"/>
				)}
				</FormItem></div> )}
				
				<Button type="link" style={{left:'17%'}} id="newa" onClick={this.addComponent}>新增参数</Button>
			</div>
                <FormItem {...tailFormItemLayout}>
                <Button type="primary" style={{right:'30%'}} htmlType="submit" id="submita" onClick={openNotification} >确定</Button>
                
                <Button type="default" style={{left:'30%'}} id="defaulta"><Link to ="/tabble">取消</Link></Button>
                </FormItem>
            </Form>
			
        </div>
    );
  }
}

const paraForm = Form.create()(RegistrationForm);

export default paraForm;