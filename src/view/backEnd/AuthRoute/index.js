import React,{Component} from 'react'
import {message} from 'antd';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
@connect(state=>({user:state.user}))
class Auth extends Component{
    checkAuth=()=>{
        if(!sessionStorage.getItem('id')&&this.props.location.pathname!='/admin/login'){
            message.error('权限不足，即将跳转登录页面',3).then(()=>{
                this.props.history.push('/admin/login');
           });
        }
    }
    componentDidMount = async ()=>{
        this.checkAuth();
    }
    render(){
        return (
            <div></div>
        )
    }
}

export default withRouter(Auth);