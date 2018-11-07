import React,{Component} from 'react'
import { Link ,withRouter} from 'react-router-dom';
import {  Menu, Icon } from 'antd';
import './style.less'
const { SubMenu } = Menu;
class Sidebar extends Component{
    state={
        selectKey:'data-statistics',
        openKey:''
    }
    componentWillMount(){
        this.setState({
            selectKey:this.props.location.pathname.split("/")[4] || this.props.location.pathname.split("/")[3],
            openKey:this.props.location.pathname.split("/")[3],
        })
    }
    render(){
        return (
            <div className="sideBarContainer">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[this.state.selectKey]}
                    defaultOpenKeys={[this.state.openKey]}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    <Menu.Item key="data-statistics">
                        <Link to="/admin/home/data-statistics" />
                        <Icon type="pie-chart" />
                        <span>数据统计</span>
                    </Menu.Item>
                    <SubMenu key="blog-manage" title={<span><Icon type="file-text" />文章管理</span>}>
                        <Menu.Item key="new-blog"><Link to="/admin/home/blog-manage/new-blog" />新建文章</Menu.Item>
                        <Menu.Item key="blog-list"><Link to="/admin/home/blog-manage/blog-list" />文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="tag-manage"><Link to="/admin/home/tag-manage" /><Icon type="appstore" />分类管理</Menu.Item>
                    <SubMenu key="message-manage" title={<span><Icon type="notification" />留言管理</span>}>
                        <Menu.Item key="message-list"><Link to="/admin/home/message-manage/message-list" />留言列表</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default withRouter(Sidebar);