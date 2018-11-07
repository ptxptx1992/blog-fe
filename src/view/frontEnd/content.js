import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import List from './pages/list'
import Detail from './pages/detail'
export default class Content extends Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={List}></Route>
                    <Route path="/home/list" component={List}></Route>
                    <Route path="/home/detail" component={Detail}></Route>
                </Switch>
            </div>
        )
    }
}