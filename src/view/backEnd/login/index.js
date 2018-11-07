import React,{Component} from 'react'
import { Form, Icon, Input, Button ,Message} from 'antd';
import './style.less'
import http from '../../../api/http'
import api from '../../../api/api'

const FormItem = Form.Item;
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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 4,
        },
    },
};
class NormalLoginForm extends Component{
    state={
        moduleLogin:true,
        loginLoading: false,
    }
    validatePhoneNumer=(rule, value, callback)=>{
        if(value&&!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))){
            callback('请输入正确手机号!');
        }else{
            callback();
        }
    }
    validatePassword=(rule, value, callback)=>{
        if(value&&!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value))){
            callback('请输入8-16位数字字母组合!');
        }else{
            callback();
        }
    }
    validateConfirmPassword=(rule, value, callback)=>{
        const form = this.props.form;
        if(value && value !== form.getFieldValue('password')){
            callback('两次密码不一致!');
        }else{
            callback();
        }
    }
    changeModule=()=>{
        let nowModule=!this.state.moduleLogin;
        this.setState({
            moduleLogin:nowModule
        });
    }
    registerSubmit =async(e) => {
        e.preventDefault();
        this.props.form.validateFields( async(err, values) => {
            if (!err) {
                let res = await http(api.REGISTER,'POST',values);
            }
        });
    }
    loginSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    loginLoading:true
                })
                let res = await http(api.LOGIN,'POST',values);
                this.setState({
                    loginLoading:false
                })
                if(res.code===200){
                    
                    this.props.history.push( '/admin/home',null)
                }else{
                    Message.error(res.message);
                }
            }
        });
    }
    componentDidMount = async ()=>{
        let res = await http(api.GET_COUNTRY_DATA,'POST');
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="loginContainer">
                {this.state.moduleLogin?
                <Form onSubmit={this.loginSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{
                                required: true,message:'手机号不能为空！'
                                }, {
                                validator: this.validatePhoneNumer,
                            }],
                        })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                        )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('loginpassword', {
                        rules: [{
                            required: true, message: '密码不能为空!',
                            }, {
                            validator: this.validatePassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                    </FormItem>
                    <FormItem  style={{textAlign:'center'}}>
                        <Button type="primary"  htmlType="submit" loading={this.state.loginLoading} >登录</Button>
                        <span style={{margin:'0px 5px'}}>Or</span>
                        <span style={{color:"#40a9ff",cursor:"pointer"}} onClick={this.changeModule}>注册</span>
                    </FormItem>
                   
                </Form>
                :
                <Form onSubmit={this.registerSubmit} className="register-form" >
                    <FormItem
                        {...formItemLayout}
                        label="手机号"
                        >
                        {getFieldDecorator('phoneNumer', {
                            rules: [{
                                required: true,message:'手机号不能为空！'
                                }, {
                                validator: this.validatePhoneNumer,
                              }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="密码"
                    >
                    {getFieldDecorator('password', {
                        rules: [{
                        required: true, message: '密码不能为空!',
                        }, {
                        validator: this.validatePassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    >
                    {getFieldDecorator('confirm', {
                        rules: [{
                        required: true, message: '密码不能为空!',
                        }, {
                        validator: this.validateConfirmPassword
                        
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label='昵称'
                    >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                    })(
                        <Input maxLength={10} />
                    )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.register}>注册</Button>
                        <span style={{margin:'0px 5px'}}>Or</span>
                        <span style={{color:"#40a9ff",cursor:"pointer"}} onClick={this.changeModule}>登录</span>
                    </FormItem>
                </Form>
                }
            </div>
        )
    }
}
const Login = Form.create()(NormalLoginForm);
export default Login;