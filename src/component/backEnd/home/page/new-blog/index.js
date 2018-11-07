import React, { Component } from 'react';
import { Input, message, Select, Button, DatePicker, AutoComplete,Breadcrumb } from 'antd';
import E from 'wangeditor'
import filterXSS from 'xss'
import './style.less'
const InputGroup = Input.Group;
const Option = Select.Option;
class newBlog extends Component{
    state={
        editorContent: ''
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
        editor.create()
    }
    save=()=>{
        console.log(this.state.editorContent);
        message.info('保存成功！');
    }
    publish=()=>{
        console.log(this.state.editorContent);
        message.info('发布成功！');
    }
    componentDidMount(){
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
                        新建文章
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="titleContainer">
                    <InputGroup compact>
                        <Select defaultValue="js" style={{ width: '15%' }}>
                            <Option value="js">JS</Option>
                            <Option value="css">CSS</Option>
                            <Option value="casual">随便谈</Option>
                        </Select>
                        <Input style={{ width: '85%' }} defaultValue="请输入标题" />
                    </InputGroup>
                </div>
                <div className="editContainer"> 
                    <div ref="editorElem" className="editorMenu"></div>
                </div>
                <div style={{textAlign:'right'}}>
                    <Button  onClick={this.publish}  type="primary">立刻发布</Button>
                </div>
            </div>
        )
    }
}
export default newBlog;