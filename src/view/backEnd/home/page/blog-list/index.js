import React, { Component } from 'react';
import { Table,Button, Row, Col,Select,Form,Radio, Breadcrumb,message} from 'antd';
import { DatePicker } from 'antd';
import {Link} from 'react-router-dom';
import './style.less'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;



class BlogList extends Component{
    state = {
        columns:[
            {
                title: '标题',
                dataIndex: 'question_count',
                key: 'question_count',
              }, {
                title: '状态',
                dataIndex: 'target_count',
                key: 'target_count',
              }, {
                title: '发布时间',
                dataIndex: 'gap_count',
                key: 'gap_count',
              }, {
                title: '下架时间',
                dataIndex: 'question_cover_rate',
                key:'question_cover_rate'
              },
              {
                title: '作者',
                dataIndex: 'question_homework_similar_rate',
                key:'question_homework_similar_rate'
              },
        ],
        tableData:[],
        pagination: {
            current:1,
            pageSize:10,
        },
        total:0,
        
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
    getData= async (params={})=>{
        console.log(111)
    }
    export= () =>{
        let exportForm=document.createElement('form');
        exportForm.method='post';
        exportForm.action=``;
        let exportInput1=document.createElement('input');
        let exportInput2=document.createElement('input');
        let exportInput3=document.createElement('input');
        let exportInput4=document.createElement('input');
        let exportInput5=document.createElement('input');
        let exportInput6=document.createElement('input');
        exportInput1.setAttribute('name','edition_id');
        exportInput1.setAttribute('value',this.state.book);
        exportInput2.setAttribute('name','grade');
        exportInput2.setAttribute('value',this.state.grade);
        exportInput3.setAttribute('name','assist_type');
        exportInput3.setAttribute('value',this.state.type);
        exportInput4.setAttribute('name','section_process');
        exportInput4.setAttribute('value',this.state.upDown);
        exportInput5.setAttribute('name','is_gap');
        exportInput5.setAttribute('value',this.state.isLack);
        exportInput6.setAttribute('name','sort_type');
        exportInput6.setAttribute('value',this.state.sort);
        exportForm.appendChild(exportInput1);
        exportForm.appendChild(exportInput2);
        exportForm.appendChild(exportInput3);
        exportForm.appendChild(exportInput4);
        exportForm.appendChild(exportInput5);
        exportForm.appendChild(exportInput6);
        document.body.appendChild(exportForm) ;  
        exportForm.submit() ;     
        document.body.removeChild(exportForm) ;
    }
    
    async componentDidMount(){
        this.getData();
    }
    render(){
        return (
            <div id="detailContainer">
                <Breadcrumb>
                    <Breadcrumb.Item style={{fontSize:20}}>
                        <Link to="/questionquantity/questiondetail">文章管理</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{fontSize:18}}>
                        <Link to="/questionquantity/questiondetail">文章列表</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="searchContainer">
                    <Row gutter={24}>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <FormItem label={`文章类型`}>
                                    <Select defaultValue="js" >
                                        <Option value="js">JS</Option>
                                        <Option value="css">CSS</Option>
                                        <Option value="casual">随便谈</Option>
                                    </Select>
                                </FormItem>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <FormItem label={`文章状态`} >
                                    <Select defaultValue="1" >
                                        <Option value="1">待发布</Option>
                                        <Option value="2">已发布</Option>
                                        <Option value="3">已下架</Option>
                                        <Option value="4">已删除</Option>
                                    </Select>
                                </FormItem>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <FormItem label={`时间范围`}>
                                    <RangePicker  />
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
                    <div style={{overflow:'hidden',margin:'10px 0px'}}>
                        <Button onClick={this.export}  type="primary" icon="download" style={{marginRight:'10px',float:'right'}} >导出</Button>
                    </div>
                    <Table onChange={this.handleTableChange}  pagination={this.state.pagination} loading={this.state.tableLoading}  columns={this.state.columns} dataSource={this.state.tableData} />
                </div>
            </div>
        )
    }

}


export default BlogList;