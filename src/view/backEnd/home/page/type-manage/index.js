import React, { Component } from 'react';
import { Table,Button,Form,Breadcrumb,Message,Modal,Input} from 'antd';
import {Link} from 'react-router-dom';
import './style.less'
import http from '@/api/http'
import api from '@/api/api'
const FormItem = Form.Item;
const confirm = Modal.confirm;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
  };
class TypeForm extends Component{
    state = {
        visible:false,
        pagination: {
            current:1,
            pageSize:10,
            total:0,
            showTotal:total => `共 ${total} 条`
        },
        columns:[
             { 
                title: '序号', key: 'index',render: (text, record,index) => (
                <div>
                   {index+1}
                </div>
                ),
             },
             {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
              }, {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
              }, {
                title: '操作',
                key: 'operation',
                render: (text, record,index) => (
                    <div>
                       <Button type='primary' style={{margin:'0px 4px'}} onClick={this.showModal.bind(this,text)}>编辑</Button>
                       <Button type='primary' onClick={this.showDeleteType.bind(this,text)}>删除</Button>
                    </div>
                ),
                
              }
        ],
        tableData:[],
        name:'',
        title:'新增类型',
        id:'',
        tableLoading:false,
        
        
    }
    showModal=(row)=>{
        if(row){
            this.setState({
                name:row.name,
                title:'编辑类型',
                visible:true,
                id:row.id
                
            })
        }else{
            this.setState({
                name:'',
                title:'新增类型',
                visible:true,
                
            })
        }
    }
    addOrEditType= async(e)=>{
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            let res;
            if(this.state.title==='新增类型'){
                res = await http(api.SET_ARTICLE_TYPE,'POST',{name:values.name});
            }else{
                res = await http(api.EDIT_ARTICLE_TYPE,'POST',{name:values.name,id:this.state.id});
            }
            if(res.code===0){
                Message.success('操作成功');
                this.hideModal();
                this.getData();
            }else{
                Message.error(res.message);
            }
        })
    }
    showDeleteType=async(val)=>{
        confirm({
            title: '是否删除该类型?',
            onOk: async (e)=> {
                this.deleteType(val.id)
            },
        });
    }
    deleteType=async (id)=>{
       let res = await http(api.DELETE_ARTICLE_TYPE,'POST',{id:id});
       if(res.code===0){
            Message.success('操作成功');
            this.getData()
       }else{
            Message.error(res.message);
       }
    }
    hideModal=()=>{
        this.setState({
            name:'',
            visible:false,
        })
        this.props.form.resetFields();
    }
    nameChange=(val)=>{
        this.setState({
            name:val.currentTarget.value
        })
    }
    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            pagination:pagination
        },()=>{
            this.getData()
        })
    }
    getData= async ()=>{
        this.setState({
            tableLoading:true,
         });
        let res = await http(api.GET_ARTICLE_TYPE_LIST,'POST',{page:this.state.pagination.current,pageSize:this.state.pagination.pageSize});
        if(res.code===0){
            const pagination = {...this.state.pagination};
            pagination.total = parseInt(res.data.count,10);
            this.setState({
                tableData:res.data.list,
                pagination:pagination,
                tableLoading:false,
            })
        }else{
            Message.error(res.message);
        }
        this.setState({
           tableLoading:false,
        });
    }
    async componentDidMount(){
        this.getData();
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="detailContainer">
                <Breadcrumb>
                    <Breadcrumb.Item style={{fontSize:20}}>
                        <Link to="/questionquantity/questiondetail">分类管理</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="tableContainer">
                    <div style={{overflow:'hidden',margin:'10px 0px'}}>
                        <Button onClick={this.showModal.bind(this,null)}  type="primary"  style={{marginLeft:'10px'}} >新建分类</Button>
                    </div>
                    <Table onChange={this.handleTableChange}  pagination={this.state.pagination} loading={this.state.tableLoading}  columns={this.state.columns} dataSource={this.state.tableData} onChange={this.handleTableChange} />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    footer={false}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form onSubmit={this.addOrEditType}>
                        <FormItem
                            {...formItemLayout}
                            label={'分类名称'}
                            >
                            {getFieldDecorator( 'name',{
                                rules: [ {
                                    required: true, message: '请输入分类名称!',
                                }],
                                initialValue: this.state.name
                            })(
                                <Input placeholder="请输入分类名称" />
                            )}
                        </FormItem>
                        <FormItem style={{textAlign:'center'}}>
                            <Button  onClick={this.hideModal} style={{marginRight:'20px'}}>取消</Button>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }

}

const TypeManage = Form.create()(TypeForm);
export default TypeManage;