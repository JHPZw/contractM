//页面集成，渲染所有页面到localhost：3000页面

import React from 'react'  
import { render } from 'react-dom'  
import { hashHistory } from 'react-router'  

import RouterPage from './routerPage'  
  
render(  
    <RouterPage history = { hashHistory } />,  
    document.getElementById('root')  
)  