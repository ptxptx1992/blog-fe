import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './header.less'
export default class Header extends Component{
    render(){
        return (
            <div className='fe_header_container'>
                <div className='tag_list'>
                    <span>
                        <Link to='/'>主页</Link>
                    </span>
                    <span>
                        <Link to='/home/listWithTag'>标签</Link>
                    </span>
                    <span>
                        <Link to='/home/about'>关于</Link>
                    </span>
                </div>
                <div className='tag'>BLOG</div>
            </div>
        )
    }
}