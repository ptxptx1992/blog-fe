import React,{Component} from 'react'
import { connect } from 'react-redux';
import {saveUserInfo} from './../../store/user/action.js'
import Content from './content'
import Header  from './header'
@connect(state=>({user:state.user}),{saveUserInfo})
export default class Home extends Component{
    componentDidMount(){
        this.props.saveUserInfo({
            name:'科比',
            id:'1'
        });
    }
    render(){
        return (
            <div>
                <Header />
                <p>{this.props.user.name}前台</p>
                <Content />
            
            </div>
        )
    }
}