import React,{Component} from 'react'
import http from '@/api/http'
import api from '@/api/api'
import { Spin } from 'antd';
// import './list.less'
class List extends Component{
    state={
       
        bloglist:[],
        loading:false,
    }
    async getBlogList(){
        this.setState({
            loading:true
        })
        let res=await http(api.GET_ARTICLE_LIST_NOPAGE,'POST',{
            type:this.state.type,
        });
        if(res.code===0){
            this.setState({
                bloglist:res.data
            })
        }
        this.setState({
            loading:false
        })
    }
    goDetail(val){
        this.props.history.push(`/home/detail/${val.id}`);
        
    }
    componentDidMount(){
       
        this.getBlogList()
    }
    render(){
        return (
            <div className='listTagContainer'>
                <div className='blogList' >
                    <Spin tip="玩命加载中。。。" spinning={this.state.loading}>
                    {
                        this.state.bloglist.map((val,index)=>{
                            return (
                                <article key={index}> 
                                    <header>
                                        <span>{val.title}</span>
                                        <span>{val.time.substring(0,10)}</span>
                                    </header>
                                    <section dangerouslySetInnerHTML={{ __html:val.content.substring(0,200)}}></section>
                                    <a style={{margin:'10px 0px',display:'block',float:'right'}} onClick={this.goDetail.bind(this,val)} href="javascript:;">查看全文</a>
                                </article>
                            )    
                        })
                    }
                    </Spin>
                </div>
            </div>
           
        )
        
    }
}

export default List;