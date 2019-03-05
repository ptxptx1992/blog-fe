import React,{Component} from 'react'
import Content from './content'
import Header  from './header'
import './index.less'
export default class Home extends Component{
   
    render(){
        return (
            <div id='container'>
                <Header  />
                <Content  />
            </div>
        )
    }
}