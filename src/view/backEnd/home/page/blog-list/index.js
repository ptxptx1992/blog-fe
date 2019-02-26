import React, { Component } from 'react';
import { Table,Button, Row, Col,Select,Form,Modal, Breadcrumb,message} from 'antd';
import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import './style.less'
import http from '@/api/http'
import api from '@/api/api'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const confirm = Modal.confirm;
class BlogList extends Component{
    state = {
        columns:[
                {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
              }, {
                title: '状态',
                dataIndex: 'type',
                key: 'type',
              }, {
                title: '发布时间',
                dataIndex: 'create_time',
                key: 'create_time',
              }, {
                title: '更新时间',
                dataIndex: 'update_time',
                key:'update_time'
              },
              ,{ title: '操作',render: (text, record) => (
                <span>
                    <a href="javascript:;" style={{ marginRight: '8px' }} onClick={this.editRow.bind(this,text)}>编辑</a>
                    <a href="javascript:;" style={{ marginRight: '8px' }} onClick={this.editType.bind(this,text,3)}>删除</a>
                    {
                        text.status===1 ? <a href="javascript:;" style={{ marginRight: '8px' }} onClick={this.editType.bind(this,text,2)}>发布</a>
                        : <a href="javascript:;" style={{ marginRight: '8px' }} onClick={this.editType.bind(this,text,1)}>下架</a>
                    }
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
        typeList:[{id:'', key:'', name: "全部"}],
        type:'',
        status:'',
        startTime:'',
        endTime:''
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
    getTypeList= async()=>{
        let res=await http(api.GET_ARTICLE_TYPE_LIST_NOPAGE,'POST',{});
        if(res.code===0){
            let list=[...this.state.typeList,...res.data.list]
            this.setState({
                typeList:list,
                type:''
            },()=>{
                console.log('list',this.state.typeList)
            })
        }
    }
    editRow=(row)=>{
       this.props.history.push({pathname:"/admin/home/blog-manage/blog-detail",query: { id : row.id}});
    }
    editType=(row,status)=>{
        let name;
        switch(status){
            case 1:name='下架'
            break;
            case 2:name='发布'
            break;
            case 3:name='删除'
            break;
            default:name='删除'
        }
        confirm({
            title: `是否要${name}该文章?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk :async()=>{
                this.confirmEditType(row.id,status)
            },
          });
    }
    confirmEditType=async (id,status)=>{
        let res=await http(api.EDIT_ARTICLE_STATUS,'POST',{
            id:id,
            status:status,
        });
        if(res.code===0){
            this.getData();
            message.success('操作成功')
        }
    }
    getData= async (params={})=>{
        let res=await http(api.GET_ARTICLE_LIST,'POST',{
            page:this.state.pagination.current,
            pageSize:this.state.pagination.pageSize,
            articleType:this.state.type,
            articleStatus:this.state.status,
            startTime:this.state.startTime,
            endTime:this.state.endTime
        });
        if(res.code===0){
            this.setState({
                buttonLoading:false,
                tableData:res.data.list
            })
        }
    }
    changeType=(value)=>{
        this.setState({
            type:value
        })
    }
    changeStatus=(value)=>{
        this.setState({
            status:value
        })
    }
    onTimeChange=(date, dateString)=>{
        this.setState({
            startTime:dateString[0],
            endTime:dateString[1],
        })
    }
    export=async () =>{
        // let res=await http(api.DOWNLOAD_ARTICLE_LIST,'POST',{
        //     type:this.state.type,
        //     status:this.state.status,
        // });
       
        let exportForm=document.createElement('form');
        exportForm.method='post';
        exportForm.action=api.DOWNLOAD_ARTICLE_LIST;
        let exportInput1=document.createElement('input');
        let exportInput2=document.createElement('input');
       
        exportInput1.setAttribute('name','type');
        exportInput1.setAttribute('value',this.state.type);
        exportInput2.setAttribute('name','status');
        console.log('status',this.state.status)
        exportInput2.setAttribute('value',this.state.status);
        
        exportForm.appendChild(exportInput1);
        exportForm.appendChild(exportInput2);
       
        document.body.appendChild(exportForm) ;  
        exportForm.submit() ;     
        document.body.removeChild(exportForm) ;
    }
    
    async componentDidMount(){
        this.getTypeList();
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
                                    <Select value={this.state.type}  onChange={this.changeType}>
                                        {this.state.typeList.map((val)=> {return (<Option key={val.id} value={val.id}>{val.name}</Option>)})}
                                    </Select>
                                </FormItem>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <FormItem label={`文章状态`} >
                                    <Select  value={this.state.status}  onChange={this.changeStatus}>
                                        <Option value="">全部</Option>
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