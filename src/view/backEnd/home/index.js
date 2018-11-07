import React,{Component} from 'react'
import Header from './header/header'
import Sidebar from './sidebar/sidebar'
import Content from './content/content'

export default class Admin extends Component{
    render(){
        return(
            <div id="homeContainer"  style={{display:'flex',flexDirection:'column',height:'100vh',minWidth:'1200px'}}>
                <Header className="header" />
                <div style={{display:'flex',flex:1}}>
                    <div style={{width:'200px'}}>
                        <Sidebar />
                    </div>
                    <div style={{ flex:1,overflowY:'scroll',backgroundColor:'#EFF1F6',padding:'20px' }}>
                        <Content />
                    </div>
                </div>
            </div>
        )
    }
}