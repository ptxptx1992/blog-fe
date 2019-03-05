import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import ListWithTag from './pages/listWithTag/list.tag'
import About from './pages/about/about'
import List from './pages/list/list'
import Detail from './pages/detail/detail'
export default class Content extends Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={List}></Route>
                    <Route path="/home/list" component={List}></Route>
                    <Route path="/home/listWithTag" component={ListWithTag}></Route>
                    <Route path="/home/about" component={About}></Route>
                    <Route path="/home/detail/*" component={Detail}></Route>
                </Switch>
            </div>
        )
    }
}