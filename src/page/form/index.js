//模板创建页面集成

import React from 'react'  
import { render } from 'react-dom'  

import FromTwo from './demo2' 


export default class From extends React.Component {
    render () {
        return (
            <div style={{width:'800px',margin: 'auto',marginTop:50}}>   
                <FromTwo/>
            </div>
        )
    }
}

