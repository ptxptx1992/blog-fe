import React, { Component } from 'react';
import { DatePicker, Spin,Button,Row,Radio,Col,Select,Form,Breadcrumb,message,Icon} from 'antd';
import {Link} from 'react-router-dom';
import echarts from 'echarts';
import CountUp from 'react-countup';
import setOptionBar from './setOption-bar'
import setOptionBarLine from './setOption-line-bar'
import './style.less'
import http from '../../../../../api/http'
import api from '../../../../../api/api'
import countryData from '../../../../../util/mock/index'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class DataStatistics extends Component{
    state = {
        totalView:0,
        todayView:0,
        quantityLoading:false,
        totalLoading:false,
        version_arr:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        quantity_arr:[10000,20000,9999,7987,10000,20000,9999,7987,9999,7987,10000,20000],
        cover_rate_arr:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
        date_arr:['6.21','6.22','5.22'],
        change_quantity_arr:[7987,10000,20000],
        change_cover_rate_arr:[70.7, 75.6, 82.2],
        buttonLoading:false,
        dateType:1,
    }
    getMenuInfo= async ()=> {
        
       
    }
    getQuantity= async ()=>{
        this.setState({
            totalView:20000,
            todayView:17,
            quantityLoading:false,
        })
    }
    getTotalChartData=()=>{
        this.setState({
            totalLoading:false,
            quantity_arr:[10000,20000,9999,7987,10000,20000,9999,7987],
        })
        this.initTotalChart();
    }
    initTotalChart=()=>{
        if(this.state.version_arr.length!==0){
            let initTotalChart = echarts.init(document.getElementById('total-bar'));
            initTotalChart.setOption(setOptionBar(
                this.state.quantity_arr,
                this.state.cover_rate_arr,
                this.state.version_arr
            ), true);
            window.addEventListener('resize', ()=>{
                initTotalChart.resize();
            });
        }
    }
    onBookChange = (val) =>{
        this.setState({
            book:val
        })
    }
    onGradeChange = (val)=>{
        this.setState({
            grade:val
        })
    }
    onUpDownChange = (val)=>{
        this.setState({
            upDown:val
        })
    }
    dateChange = (val) =>{
        console.log(val)
    }
    
    initChangeChart=()=>{
        if(this.state.date_arr.length!==0){
            let initChangeChart = echarts.init(document.getElementById('cover-bar-line'));
            initChangeChart.setOption(setOptionBarLine(
                this.state.date_arr,
                this.state.change_quantity_arr,
                this.state.change_cover_rate_arr
            ), true);
            window.addEventListener('resize', ()=>{
                initChangeChart.resize();
            });
        }
    }
    search=()=>{
        this.initChangeChart();
    }
    onDateTypeChange =(val)=>{
        this.setState({
            dateType: val.target.value,
        });
        this.search();
    }
    getData=async()=>{
        let res = await http(api.GET_COUNTRY_DATA,'POST');
        console.log(res)
    }
    componentDidMount = async ()=>{
        this.getData()
        this.getQuantity();
        this.getTotalChartData();
        await this.getMenuInfo();
        this.search();
    }
    render(){
        return (
            <div id="chapterContainer">
                <Breadcrumb>
                    <Breadcrumb.Item style={{fontSize:20}}>
                        数据统计
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="titleContainer">
                    <article>
                        <section>
                            <div>
                                <Icon type="file-text" />
                            </div>
                            <div>
                                <div>
                                    <p><CountUp 
                                        start={0}
                                        end={this.state.totalView}
                                        duration={1.5}
                                        useEasing={true}
                                        separator=","
                                    /></p>
                                    <p>总访问量</p>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div>
                                <Icon type="filter" />
                            </div>
                            <div>
                                <div>
                                    <p><CountUp 
                                        start={0} 
                                        end={this.state.todayView} 
                                        duration={1.5}
                                        useEasing={true}
                                         /></p>
                                    <p>今日访问量</p>
                                </div>
                            </div>
                        </section>
                    </article>
                    <article>
                        <Spin  spinning = {this.state.totalLoading} tip="玩命加载中!">
                            <h3>地区信息</h3>
                            {
                                this.state.version_arr.length===0?
                                <div className="no-data" style={{position:'absolute'}}>暂无数据</div>
                                :
                                <div id="total-bar"></div>
                            }
                        </Spin>
                    </article>
                </div>
                <div className="tableContainer">
                    <h3>
                        文章数量统计：
                        <span className="blog-count"><CountUp 
                            start={0} 
                            end={this.state.todayView} 
                            duration={1.5}
                            useEasing={true}
                        />篇</span >
                        

                    </h3>
                    <div className="searchContainer">
                        <Row gutter={24}>
                            <Col className="gutter-row" span={8} >
                                <div className="gutter-box">
                                    <FormItem label={`时间范围`}>
                                        <RangePicker />
                                    </FormItem>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8} >
                                <div className="gutter-box">
                                    <FormItem label={`分类`} >
                                        <Select defaultValue="js" >
                                            <Option value="js">JS</Option>
                                            <Option value="css">CSS</Option>
                                            <Option value="casual">随便谈</Option>
                                        </Select>
                                    </FormItem>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8} >
                                <div className="gutter-box"  >
                                    <Button loading={this.state.buttonLoading}  onClick={this.search} style={{marginRight:'10px'}} type="primary" icon="search">查询</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Spin  spinning = {this.state.totalLoading} tip="玩命加载中!">
                        {
                            this.state.date_arr.length===0?
                            <div className="no-data" style={{position:'absolute'}}>暂无数据</div>
                            :
                            <div style={{position:'relative'}}>
                                <div id="cover-bar-line"></div>
                                <div className="date-type">
                                    <RadioGroup onChange={this.onDateTypeChange} value={this.state.dateType}>
                                        <RadioButton value={1}>周</RadioButton>
                                        <RadioButton value={2}>月</RadioButton>
                                    </RadioGroup>
                                </div>
                            </div>
                        }
                    </Spin>
                </div>    
            </div>    
        )
    }

}


export default DataStatistics;