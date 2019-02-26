import React, { Component } from 'react';
import { Table,Button, Row, Col,Select,Form,Radio, Breadcrumb,message} from 'antd';
import { DatePicker } from 'antd';
import {Link} from 'react-router-dom';
import http from '@/api/http'
import api from '@/api/api'
import './style.less'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class MessageList extends Component{
    state = {
        columns:[
             {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
             }, 
             {
                title: '留言内容',
                dataIndex: 'content',
                key: 'content',
              }, {
                title: '留言时间',
                dataIndex: 'date',
                key: 'date',
              }, {
                title: '状态',
                render:(text,record)=>{
                    <span>{this.getStatusText(text)}</span>
                }
              },
              {
                title: '对应文章',
                dataIndex: 'title',
                key:'title'
              },
              ,{ title: '操作',render: (text, record) => (
                <span>
                    {
                    text.status===1 ? <a href="javascript:;" style={{ marginRight: '8px' }} onClick={this.updateStatus.bind(this,text,2)}>通过</a>
                    : ''
                    }
                    <a href="javascript:;" style={{ marginRight: '8px' }} onClick={this.updateStatus.bind(this,text,3)} >删除</a>
                </span>
                ),
              },
        ],
        tableData:[],
        pagination: {
            current:1,
            pageSize:10,
        },
        total:0,
        articleList:[{id:'', key:'', title: "全部"}],
        article:'',
        status:'',
        startTime:'',
        endTime:'',
    }
    search = ()=>{
        this.setState({
            buttonLoading:true,
            pagination:{
                current:1,
                pageSize:10,
            }
        })
        this.getData();
    }
    getArticleList= async()=>{
        let res=await http(api.GET_ARTICLE_LIST_NOPAGE,'POST',{});
        if(res.code===0){
            let list=[...this.state.articleList,...res.data]
            this.setState({
                articleList:list,
            },()=>{
                console.log('list',this.state.articleList)
            })
        }
    }
    changeStatus=async(val)=>{
        this.setState({
            status:val
        })
    }
    getData= async (params={})=>{
        let res=await http(api.GET_MESSAGE_LIST,'POST',{
            page:this.state.pagination.current,
            pageSize:this.state.pagination.pageSize,
            article:this.state.article,
            status:this.state.status,
            startTime:this.state.startTime,
            endTime:this.state.endTime
        });
        if(res.code===0){
            const pagination = {...this.state.pagination};
            pagination.total = parseInt(res.data.count,10);
            this.setState({
                tableData:res.data.list,
                pagination:pagination,
            })
        }
    }
    changeArticle=(value)=>{
        this.setState({
            article:value
        })
    }
    onTimeChange=(date, dateString)=>{
        this.setState({
            startTime:dateString[0],
            endTime:dateString[1],
        })
    }
    getStatusText=(text)=>{
        return 1111;
        console.log(text.status)
        // switch(text.status){
        //     case 1: 
        //         return '待审核'
        //     break;
        //     case 2: 
        //         return '已审核'
        //     break;
        //     case 3: 
        //         return '已删除'
        //     break;
        //     default:
        //         return '待审核'
        // }
        
    }
    updateStatus=async(row,status)=>{
        let res=await http(api.UPDATE_MESSAGE_LIST,'POST',{
            id:row.id,
            status:status
        });
        if(res.code===0){
            this.getData();
            message.success('操作成功！')
        }
    }
    async componentDidMount(){
        this.getArticleList();
        this.getData();
    }
    render(){
        return (
            <div id="detailContainer">
                <Breadcrumb>
                    <Breadcrumb.Item style={{fontSize:20}}>
                        <Link to="/questionquantity/questiondetail">留言管理</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{fontSize:18}}>
                        <Link to="/questionquantity/questiondetail">留言列表</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="searchContainer">
                    <Row gutter={24}>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <FormItem label={`文章列表`}>
                                    <Select value={this.state.article}  onChange={this.changeArticle}>
                                        {this.state.articleList.map((val)=> {return (<Option key={val.id} value={val.id}>{val.title}</Option>)})}
                                    </Select>
                                </FormItem>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <FormItem label={`留言状态`} >
                                    <Select  value={this.state.status}  onChange={this.changeStatus}>
                                        <Option value="0">全部</Option>
                                        <Option value="1">待审核</Option>
                                        <Option value="2">已通过</Option>
                                        <Option value="3">已舍弃</Option>
                                    </Select>
                                </FormItem>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <FormItem label={`时间范围`}>
                                    <RangePicker  onChange={this.onTimeChange}   />
                                </FormItem>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <Button loading={this.state.buttonLoading}  onClick={this.search} style={{marginRight:'10px'}} type="primary" icon="search">查询</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="tableContainer">
                    <Table onChange={this.handleTableChange}  pagination={this.state.pagination} loading={this.state.tableLoading}  columns={this.state.columns} dataSource={this.state.tableData} />
                </div>
            </div>
        )
    }

}


export default MessageList;