//合同管理页面集成

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TabbleOne from './demo1' 

export default class TabbleAll extends React.Component {
    constructor (props) {
        super(props)
    }
    
    render () {
        return (
            <div style={{width:'auto',margin: 'auto',marginTop:10}}>   
                <TabbleOne/> 
            </div>
        )
    }
}