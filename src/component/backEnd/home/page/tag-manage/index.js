import React, { Component } from 'react';
import { Table,Button, Row, Col,Select,Form,Radio, Breadcrumb,message,Modal,Input} from 'antd';
import { DatePicker } from 'antd';
import {Link} from 'react-router-dom';
import './style.less'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;



class TagManage extends Component{
    state = {
        visible:false,
        columns:[
            {
                title: '名称',
                dataIndex: 'question_count',
                key: 'question_count',
              }, {
                title: '创建时间',
                dataIndex: 'target_count',
                key: 'target_count',
              }, {
                title: '操作',
                dataIndex: 'gap_count',
                key: 'gap_count',
              }
        ],
        tableData:[],
        pagination: {
            current:1,
            pageSize:10,
        },
        total:0,
        
    }
    newTag=()=>{
        this.setState({
            visible:true,
        })
    }
    hideModal=()=>{
        this.setState({
            visible:false,
        })
    }
    getData= async (params={})=>{
        console.log(111)
    }
    async componentDidMount(){
        this.getData();
    }
    render(){
        return (
            <div id="detailContainer">
                <Breadcrumb>
                    <Breadcrumb.Item style={{fontSize:20}}>
                        <Link to="/questionquantity/questiondetail">分类管理</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="tableContainer">
                    <div style={{overflow:'hidden',margin:'10px 0px'}}>
                        <Button onClick={this.newTag}  type="primary"  style={{marginLeft:'10px'}} >新建分类</Button>
                    </div>
                    <Table onChange={this.handleTableChange}  pagination={this.state.pagination} loading={this.state.tableLoading}  columns={this.state.columns} dataSource={this.state.tableData} />
                </div>
                <Modal
                    title="Modal"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <Input placeholder="请输入分类名称" />
                </Modal>
            </div>
        )
    }

}


export default TagManage;