import React,{Component} from 'react'


import { Button } from 'antd';

class Detail extends Component{
    render(){
    
        
        let data={
            name:"哈哈哈"
        }
        return (
            <div>
                <Button type="primary">登录</Button>
                <Button type="primary" >登出</Button>
                <ul>
                    <li>用户姓名</li>
                    <li>用户ID</li>
                    <li>前台列表1</li>
                    <li>前台列表2</li>
                    <li>前台列表3</li>
                </ul>
            </div>
        )
    }
}

export default Detail;