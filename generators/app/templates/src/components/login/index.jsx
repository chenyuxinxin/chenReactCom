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
                    <div className={style['welcome-text']}>???????????????????????????</div>
                    <div className={style['login-tab-box']}>
                        <div className={style['login-tab']}>  
                            <div className={isUsePhone ? style['fz-blue'] : null} onClick={()=>{setIsUsePhone(true) }}>??????????????????</div>  <span>|</span> <div className={isUsePhone ? null : style['fz-blue'] } onClick={()=>{setIsUsePhone(false) }}>?????????????????????</div>
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
                                label="??????"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '???????????????',
                                    },
                                ]}
                            >
                                <Input />                 
                            </Form.Item>
                            <span className={style['register']} onClick={()=>{gotoRegiter()}}>??????</span>
                            </div>
                          <div className={style['df-box']}>
                            <Form.Item
                                label="??????"
                                name="password"
                                rules={[
                                        {
                                        required: true,
                                        message: '???????????????',
                                        },
                                        ]}
                                    >
                                       <Input.Password /> 
                            </Form.Item>
                            <span className={style['register']} onClick={()=>{gotoFoegetPassword()}}>????????????</span>
                          </div >
                           
                       
                            <Form.Item >
                                <div className={style['submit-box']}>
                                    <Button type="primary" htmlType="submit" style={{width:'140px'}}>
                                        ??????
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
                                    label="?????????"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '??????????????????',
                                        },
                                    ]}
                                >
                                    <Input  value={phone} onChange={(e)=>{getPhoneNum(e)}} />
                            </Form.Item>
                            <Form.Item
                                    label="?????????"
                                    name="verification_code"
                                    rules={[
                                        {
                                            required: true,
                                            message: '??????????????????',
                                        },
                                    ]}
                                   
                                >
                                    <div className={style['register-verification']}> 
                                    <Input style={{width:'60%'}} />
                                    {
                                        !verificationIsClick ? <div style={{width:'35%'}} className={style['send-verification']} onClick={()=>{sendVerdifiNum()}}> ??????????????? </div>:<div style={{width:'35%'}} className={style['send-verification']} > {coutDown} </div>
                                    
                                    }
                                    </div> 
                            </Form.Item>                    
                            <Form.Item >
                                    <div className={style['submit-box']}>
                                    <Button type="primary" htmlType="submit" style={{width:'140px'}}>
                                        ??????
                                    </Button>
                                    </div>                           
                            </Form.Item>
                        </Form>
                        
                    }
                </div>
        </>
    )
}