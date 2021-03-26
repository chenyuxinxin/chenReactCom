import React,{useState} from 'react'
import { Input, Button ,Form} from 'antd'
import style from './index.module.css'
import PropTypes from 'prop-types';
import { $request } from '../../request'
import { Auth } from 'components_fe'
ForgetPassword.propTypes = {
    setShowFormIndex3: PropTypes.func
}
export default function ForgetPassword (props){
  let {setShowFormIndex3} = props;
  const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
  const [ isUsePhone, setIsUsePhone ] = useState(true)
  const [ verificationIsClick, setVerificationIsClick ] = useState(false)
  let [ coutDown, setCoutDown ] = useState(60)
  let countInterVal = null
  function onFinish(values) {  
      $request.daily.login({
          "username": "jpbirdy",
          "password": "123456"
      }).then(res => {
          // Auth.redirectLoginLocation(res.data.token)
      })
  }
  function onFinishFailed (errorInfo) {
      console.log('Failed:', errorInfo);
  }
  function onFinishPhone (values) {
      console.log(values);
   
  }
  function onFinishFailedPhone (errorInfo){
      console.log(errorInfo);
  }
  function sendVerdifiNum () {
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
    setShowFormIndex3(1)
  }
    
  


  return (
      <>
      <div className={style['input-part']}>
      <div className={style['back-login']} onClick={()=>{gobackLogin()}}> 返回登陆页</div>
                  <div className={style['hello']}>找回密码</div>
                  {/* <div className={style['welcome-text']}>找回密码</div> */}
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
                                  <Input />
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

                          <Form.Item >
                                  <div className={style['submit-box']}>
                                  <Button type="primary" htmlType="submit" style={{width:'140px'}}>
                                      提交
                                  </Button>
                                  </div>                           
                          </Form.Item>
                      </Form>
                      
                  }
              </div>
      </>
  )

  
}