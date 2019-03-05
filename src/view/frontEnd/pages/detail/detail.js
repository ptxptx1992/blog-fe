import React,{Component} from 'react'
import { Spin } from 'antd';
import http from '@/api/http'
import api from '@/api/api'
import './detail.less'

export default class Detail extends Component{
    state={
        id:'',
        blog:null,
        loading:false,
    }
    componentWillMount(){
        this.setState({
            id : this.props.match.params[0]
        },()=>{
            this.getData();
        })
    }
    async getData(){
        if(this.state.id){
            this.setState({
                loading:true
            })
            let res=await http(api.GET_ARTICLE_DETAIL,'POST',{
                id:this.state.id
            });
            if(res.code===0){
                this.setState({
                    blog:res.data[0]
                })
            }
            this.setState({
                loading:false
            })
        }
    }
    render(){
        return (
            <Spin tip="玩命加载中。。。" spinning={this.state.loading}>
                <div className='articleContainer'>
                    <article > 
                        <header>
                            <span>{this.state.blog&&this.state.blog.title}</span>
                            <span>{this.state.blog&&this.state.blog.create_time.substring(0,10)}</span>
                        </header>
                        <section dangerouslySetInnerHTML={{ __html:this.state.blog&&this.state.blog.content}}></section>
                    </article>
                </div>
            </Spin>
        )
    }
}
