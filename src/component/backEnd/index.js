import React,{Component} from 'react'
import { connect } from 'react-redux';
import {Route,Switch} from 'react-router-dom'
import Login from './login'
import Home from './home'
@connect(
    state=>({user:state.user})
)
export default class BackEnd extends Component{
    render(){
        return (
           <Switch>
               <Route path="/admin" exact component={Home} />
               <Route path="/admin/home"  component={Home} />
               <Route path="/admin/login" component={Login} />
           </Switch>
        )
    }
}