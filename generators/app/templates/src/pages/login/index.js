import React, { useState } from 'react'
import style from './index.module.css'
import Logo from './logo.png'
import Login from '../../components/login/index.jsx'
import Register from '../../components/register/index.jsx'
import ForgetPassword from '../../components/forgetPassword/index.jsx'
import PropTypes from 'prop-types';
LoginPage.propTypes = {
    setShowFormIndex: PropTypes.func
}
export default function LoginPage() {
    const [ showFormIndex, setShowFormIndex ] = useState(1)
    function  renderForm () {
        if(showFormIndex===1){
            return <Login setShowFormIndex={setShowFormIndex}></Login>
        } else if (showFormIndex===2){
            return <Register setShowFormIndex2={setShowFormIndex}></Register>
        }else  if(showFormIndex===3){
            return <ForgetPassword setShowFormIndex3={setShowFormIndex}></ForgetPassword>
        }
    }
   
    return (
        <div className={style['login-page']}>
            <div className={style['login-title']}>
                <img src={Logo} alt='' style={{ width: '80px', height: '40px' }} /> | <span>雪浪云河图系统</span>
            </div>
            <div className={style['middle-part']}>
                <div className={style['login-detail']}>
                    <div className={style['login-detail-top']}>
                        {/* <div className={style['xuelangyun']}>雪浪云</div> */}
                        <div className={style['system']}>雪浪云河图系统</div>
                    </div>

                    <div className={style['introduction']}>
                        多维度&nbsp;&nbsp;
                        <div className={style['circle']}></div>
                        &nbsp;&nbsp; 多目标&nbsp;&nbsp;
                        <div className={style['circle']}></div>
                        &nbsp;&nbsp; 多场景
                    </div>
                </div>
            <div className={style['input-part']}>
                {
                 renderForm()
                }
           
            </div>
           
           
            </div>
        </div>
    )
}

