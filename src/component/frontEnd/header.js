import React,{Component} from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component{
    render(){
        return (
            <div>
                
                <ul>
                    <li>
                        <Link to='/'>博客列表哦（默认）</Link>
                    </li>
                    <li>
                        <Link to='/home/detail'>某个详情</Link>
                    </li>
                </ul>
            </div>
        )
    }
}