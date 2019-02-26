import React,{Component} from 'react'
import { connect } from 'react-redux';
import {Route,Switch} from 'react-router-dom'
import Login from './login'
import Home from './home'
import AuthRoute from './AuthRoute'

@connect(
    state=>({user:state.user})
)
export default class BackEnd extends Component{
    render(){
        return (
            // <Switch>
                <div>
                    <AuthRoute></AuthRoute>
                    <Route path="/admin" exact component={Home} />
                    <Route path="/admin/home"  component={Home} />
                    <Route path="/admin/login" component={Login} />
                </div>
            // </Switch>
        )
    }
}