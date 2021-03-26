import React ,{useState}from 'react'
import { Input, Button ,Form,notification} from 'antd'
import style from './index.module.css'
import PropTypes from 'prop-types';
import { $request } from '../../request'
import { Auth, Location } from 'components_fe'
import { useHistory } from "react-router-dom";
Login.propTypes = {
    setShowFormIndex: PropTypes.func
}
export default function  Login (props) {
    let history = useHistory();
    let {setShowFormIndex} = props;
    const [ isUsePhone, setIsUsePhone ] = useState(true)
    const [ verificationIsClick, setVerificationIsClick ] = useState(false)
    let [ coutDown, setCoutDown ] = useState(60)
    const [ phone, setPhone ] = useState('')
    const [ verificationId, setVerificationId ] = useState('')
    let countInterVal = null
    function onFinish(values) {         
        $request.daily.login({
          ...values
        }).then(res => {
            console.log(res,'hetu_console_fe');     
            let querys = Location.getQueryFromUrl()
            if(querys['redirectUrl']) {
                Auth.redirectLoginLocation(res.data.token)
            } else {
                history.push("/");
            }
        })
    }
    function onFinishFailed (errorInfo) {
        console.log('Failed:', errorInfo);
    }
    function onFinishPhone (values) {
        $request.daily.login({
            username:values.phone,
            verification_code:values.verification_code,
            verification_id:verificationId
          }).then(res => {
              let querys = Location.getQueryFromUrl()
            if(querys['redirectUrl']) {
                Auth.redirectLoginLocation(res.data.token)
            } else {
                history.push("/");
            }
          })
     
    }
    function onFinishFailedPhone (errorInfo){
        console.log(errorInfo);
    }
    function sendVerdifiNum () {         
        $request.daily.verificationCode({
            phone:phone
          }).then(res => {
            setVerificationId(res.data.verification_id)
          })
        setVerificationIsClick (true)
        clearInterval(countInterVal); 
            countInterVal =  window.setInterval(()=>{
            let num = coutDown--
            setCoutDown(num)
            if(coutDown===0){
                setVerificationIsClick(false)
                setCoutDown(60)
                clearInterval(countInterVal); 
                }
        },1000)
       
       
    }
    function gotoRegiter () {
        // history.push("/home");
        setShowFormIndex(2)
    }
    function gotoFoegetPassword () {
        setShowFormIndex (3)
    }
    function getPhoneNum (e) {
        setPhone(e.target.value)
    }

    return(
        <>
         <div className={style['input-part']} >
                    <div className={style['hello']}>Hello</div>
                    <div className={style['welcome-text']}>欢迎登陆雪浪云河图</div>
                    <div className={style['login-tab-box']}>
                        <div className={style['login-tab']}>  
                            <div className={isUsePhone ? style['fz-blue'] : null} onClick={()=>{setIsUsePhone(true) }}>帐号密码登录</div>  <span>|</span> <div className={isUsePhone ? null : style['fz-blue'] } onClick={()=>{setIsUsePhone(false) }}>手机验证码登录</div>
                        </div>
                    </div>
                    {
                        isUsePhone ?   <Form        
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <div className={style['df-box']}>
                            <Form.Item
                                label="帐号"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入帐号',
                                    },
                                ]}
                            >
                                <Input />                 
                            </Form.Item>
                            <span className={style['register']} onClick={()=>{gotoRegiter()}}>注册</span>
                            </div>
                          <div className={style['df-box']}>
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[
                                        {
                                        required: true,
                                        message: '请输入密码',
                                        },
                                        ]}
                                    >
                                       <Input.Password /> 
                            </Form.Item>
                            <span className={style['register']} onClick={()=>{gotoFoegetPassword()}}>找回密码</span>
                          </div >
                           
                       
                            <Form.Item >
                                <div className={style['submit-box']}>
                                    <Button type="primary" htmlType="submit" style={{width:'140px'}}>
                                        登录
                                    </Button>
                                </div>                           
                            </Form.Item>
                        </Form> 
                            : 
                        < Form        
                                name="basic"
                                onFinish={onFinishPhone}
                                onFinishFailed={onFinishFailedPhone}
                            >
                            <Form.Item
                                    label="手机号"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入手机号',
                                        },
                                    ]}
                                >
                                    <Input  value={phone} onChange={(e)=>{getPhoneNum(e)}} />
                            </Form.Item>
                            <Form.Item
                                    label="验证码"
                                    name="verification_code"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码',
                                        },
                                    ]}
                                   
                                >
                                    <div className={style['register-verification']}> 
                                    <Input style={{width:'60%'}} />
                                    {
                                        !verificationIsClick ? <div style={{width:'35%'}} className={style['send-verification']} onClick={()=>{sendVerdifiNum()}}> 发送验证码 </div>:<div style={{width:'35%'}} className={style['send-verification']} > {coutDown} </div>
                                    
                                    }
                                    </div> 
                            </Form.Item>                    
                            <Form.Item >
                                    <div className={style['submit-box']}>
                                    <Button type="primary" htmlType="submit" style={{width:'140px'}}>
                                        登录
                                    </Button>
                                    </div>                           
                            </Form.Item>
                        </Form>
                        
                    }
                </div>
        </>
    )
}