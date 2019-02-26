import React, { Component } from 'react';
import { Input, message, Select, Button,Breadcrumb } from 'antd';
import E from 'wangeditor'
import filterXSS from 'xss'
import './style.less'
import http from '@/api/http'
import api from '@/api/api'
const InputGroup = Input.Group;
const Option = Select.Option;
class newBlog extends Component{
    state={
        editorInitData:'',
        editorContent: '',
        typeList:[],
        type:'',
        title:'',
        id:''
    }
    initEditor(){
        const elem = this.refs.editorElem
        const editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: filterXSS(html)
            })
        }
        editor.customConfig.zIndex = 100
        editor.create();
        editor.txt.html(this.state.editorInitData);
    }
    edit= async()=>{
        if(!this.state.title){
            message.warning('请输入标题');
        }
        if(!this.state.editorContent){
            message.warning('请输入内容');
        }
        else{
            // let params={
            //     title:this.state.title,
            //     content:this.state.editorContent,
            //     type:this.state.type,
            //     id:this.state.id,
            // }
            // let res=await http(api.EDIT_ARTICLE,'POST',params);
            // if(res.code===0){
            //     message.success('操作成功！');
            // }
        }
    }
    changeType=(value)=>{
        this.setState({
            type:value
        })
    }
    changeTitle=(event)=>{
       
        this.setState({
            title:event.target.value
        })
    }
    getTypeList= async()=>{
        let res=await http(api.GET_ARTICLE_TYPE_LIST_NOPAGE,'POST',{});
        if(res.code===0){
            this.setState({
                typeList:res.data.list,
                type:res.data.list[0].id
            },()=>{
                console.log(this.state.type)
            })
        }
    }
    getData=async()=>{
        let res= await http(api.GET_ARTICLE_DETAIL,'POST',{id:this.props.location.query.id});
        if(res.code===0){
            this.setState({
                editorInitData:res.data[0].content,
                title:res.data[0].title,
                type:res.data[0].type,
            },()=>{
                console.log(this.state.editorInitData)
            })
        }
    }
    componentDidMount=async()=>{
        this.getTypeList();
        if(this.props.location.query&&this.props.location.query.id){
            this.setState({
                id:this.props.location.query.id
            })
            await  this.getData();
        }
        this.initEditor();
    }   
    render(){
        return (
            <div className="newBlog">
                <Breadcrumb>
                    <Breadcrumb.Item style={{fontSize:20}}>
                        文章管理
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{fontSize:18}}>
                        文章详情
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="titleContainer">
                    <InputGroup compact>
                        <Select value={this.state.type} style={{ width: '15%' }} onChange={this.changeType}>
                            {this.state.typeList.map((val)=> {return (<Option key={val.id} value={val.id}>{val.name}</Option>)})}
                        </Select>
                        <Input defaultValue={this.state.title} style={{ width: '85%' }} placeholder='请输入标题' onChange={this.changeTitle} />
                    </InputGroup>
                </div>
                <div className="editContainer"> 
                    <div ref="editorElem" className="editorMenu"></div>
                </div>
                <div style={{textAlign:'right'}}>
                    <Button  onClick={this.edit}  type="primary">保存修改</Button>
                </div>
            </div>
        )
    }
}
export default newBlog;