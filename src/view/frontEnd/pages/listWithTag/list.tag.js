import React,{Component} from 'react'
import http from '@/api/http'
import api from '@/api/api'
import { Spin } from 'antd';
import './list.tag.less'
class Detail extends Component{
    state={
        typeList:[],
        selected:'',
        type:'',
        bloglist:[],
        loading:false,
    }
    changeTag(val,index){
        this.setState({
            selected:index,
            type:val.id,
        },()=>{
            this.getBlogList();
        })
    }
    async getTypeList(){
        let res=await http(api.GET_ARTICLE_TYPE_LIST_NOPAGE,'POST',{});
        if(res.code===0){
            this.setState({
                typeList:res.data.list
            })
        }
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
        this.getTypeList()
        this.getBlogList()
    }
    render(){
        return (
            <div className='listTagContainer'>
                <div className='tagList'>
                    {
                        this.state.typeList.map((val,index)=>{
                            return (
                                <button onClick={this.changeTag.bind(this,val,index)} className={this.state.selected===index?'active':''} key={index}>{val.name}</button>
                            )    
                        })
                    }
                </div> 
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

export default Detail;