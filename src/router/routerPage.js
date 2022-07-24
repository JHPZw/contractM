//routerPage路由页面，页面跳转基础

import React from 'react'  
import { Router, Route, IndexRoute, browserHistor, Link } from 'react-router'  

// 引入所有基础配置
  
import Demo1 from '../page' 
import Tabble from '../page/tabble'
import TabbleC from '../page/tabbleC'
import Form from '../page/form'
import FormC from '../page/formC'





export default class RouteMap extends React.Component {  
    updateHandle () {  
        console.log('每次router变化之后都会触发')  
    }  
    render () {  
        return (  
            <Router history={this.props.history}  onUpdate={this.updateHandle.bind(this)}>  
                <Route path='/' component={Demo1}>
                    <IndexRoute component={Tabble}/> 
                    <Route path='/tabble' component={Tabble}></Route>
					<Route path='/tabbleC' component={TabbleC}></Route>
                    <Route path='/form' component={Form}></Route>
					<Route path='/formC' component={FormC}></Route>
					
                </Route>  
            </Router>  
        )  
    }  
}  
