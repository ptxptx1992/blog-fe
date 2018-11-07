import React,{Component} from 'react'
import   './style.less';
export default class Header extends Component{
    render(){
        return (
            <div className="headerContainer">
                <div className="logo">
                   
                </div>
                <div className="title">
                    <span>后台管理系统</span>
                </div>
                <div className="userName">
                    <span>麦迪</span>
                    <img alt={`头像`} className="head" src={require('./../../../../static/img/panda.gif')} />
                </div>
            </div>
        )
    }
}