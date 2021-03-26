  import React,{useState} from 'react'
  import { Input, Button ,Form} from 'antd'
  import style from './index.module.css'
  import PropTypes from 'prop-types';
  import { $request } from '../../request'
  import { Auth } from 'components_fe'
  Register.propTypes = {
    setShowFormIndex2: PropTypes.func
}
  export default function Register (props){
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      }; 
    const {setShowFormIndex2} = props
    const [ verificationIsClick, setVerificationIsClick ] = useState(false)
    let [ coutDown, setCoutDown ] = useState(60)
    const [ verificationId, setVerificationId ] = useState('')
    const [ phone, setPhone ] = useState('')
    let countInterVal = null
    function onFinishPhone (values) {
        $request.daily.register({
            ...values,verification_id:verificationId
          }).then(res => {
            Auth.redirectLoginLocation(res.data.token)
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
    function gobackLogin () {
        setShowFormIndex2(1)
    }
    function getPhoneNum (e) {
        setPhone(e.target.value)
    }



    return (
        <>
        <div className={style['input-part']}>
                   <div className={style['back-login']} onClick={()=>{gobackLogin()}}> 返回登陆页</div>
                    <div className={style['hello']}>Hello</div>
                    <div className={style['welcome-text']}>欢迎注册雪浪云河图</div>
                    {
                        < Form        
                                name="basic"
                                onFinish={onFinishPhone}
                                onFinishFailed={onFinishFailedPhone}
                            >
                            <Form.Item {...layout}
                                    label="手机号"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入手机号',
                                        },
                                    ]}
                                >
                                    <Input   value={phone} onChange={(e)=>{getPhoneNum(e)}} />
                            </Form.Item>
                            <Form.Item
                                    {...layout}
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
                            <Form.Item
                                    {...layout}
                                    label="密码"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码',
                                        },
                                    ]}
                                >
                                    <div className={style['register-verification']}> 
                                    <Input  />
                                    
                                    </div> 
                            </Form.Item>  
                            {/* <Form.Item
                                    {...layout}
                                    label="确认密码"
                                    name="confirmpassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码',
                                        },
                                    ]}
                                >
                                    <div className={style['register-verification']}> 
                                    <Input  />
                                    
                                    </div> 
                            </Form.Item>                   */}
                            <Form.Item >
                                    <div className={style['submit-box']}>
                                    <Button type="primary" htmlType="submit" style={{width:'140px'}}>
                                        注册并登录
                                    </Button>
                                    </div>                           
                            </Form.Item>
                        </Form>
                        
                    }
                </div>
        </>
    )

    
  }