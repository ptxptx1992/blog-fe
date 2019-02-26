import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import NewBlog from '../page/new-blog/index'
import DataStatistics from '../page/data-statistics/index'
import BlogList from '../page/blog-list/index'
import BlogDetail from '../page/blog-detail/index'
import TypeManage from '../page/type-manage/index'
import MessageList from '../page/message-list';

export default class Content extends Component{
    render(){
       
        return (
            <div>
                <Switch>
                    <Route path="/admin" exact component={DataStatistics}></Route>   
                    <Route path="/admin/home" exact component={DataStatistics}></Route>
                    <Route path="/admin/home/data-statistics" component={DataStatistics}></Route>
                    <Route path="/admin/home/blog-manage/new-blog" component={NewBlog}></Route>
                    <Route path="/admin/home/blog-manage/blog-list" component={BlogList}></Route>
                    <Route path="/admin/home/blog-manage/blog-detail" component={BlogDetail}></Route>
                    <Route path="/admin/home/type-manage" component={TypeManage}></Route>
                    <Route path="/admin/home/message-manage/message-list" component={MessageList}></Route>
                </Switch>
            </div>
        )
    }
}