import React ,{useState,useEffect}from 'react'
import styles from './index.module.css'
import { Menu ,Button} from 'antd';
import { LayoutCon,PublicFunction} from 'components_fe'


export default function User (){
    const [leftPanelArr,setLeftPanelArr] = useState([])
    const [type,setType] = useState(undefined)

    useEffect(() => {
        let str =PublicFunction.getUrlParams('type')        
        setType(str)      
    }, [PublicFunction.getUrlParams('type')])
    return(
        <div className={styles['user-page']}>
            <LayoutCon getLeftPanelArr={setLeftPanelArr} ></LayoutCon>
            <div className = {styles['user-page-content']}>
                <div className={styles['menu']}>
                    {
                        type ? <Menu
                        defaultSelectedKeys={[`${type}`]}
                        mode="inline"
                        theme="dark"
                    >
                        <Menu.Item key="info"  onClick = {()=>{setType('info')}}>
                            账户信息
                        </Menu.Item>
                        <Menu.Item key="safe" onClick = {()=>{setType('safe')}}>
                            账户安全
                        </Menu.Item>         
                    </Menu> : null
                    }               
                </div>
                <div className={styles['right-page-box']}>
                    <div className={styles['right-page']}>
                        {
                            type === 'info'?<div><div className={styles['title']}>账户信息</div>
                            <div className ={styles['right-content']}>
                                <div>账户名：王001a</div>
                                <div>用户ID：00001</div>
                                <div>公司名称：雪浪云</div>
                                <div>职位：运营专员</div>
                            </div>
                            <div className ={styles['right-btn']}>
                                 <Button type='primary'>修改信息</Button>
                            </div></div> : <div><div className={styles['title']}>账户安全</div>
                            <div className ={styles['right-content']}>
                                <div>手机号：18612345678</div>
                                <div>邮箱：18612345678@qq.com</div>
                                <div>登录密码：*******</div>
                            </div>
                            <div className ={styles['right-btn']}>
                                 <Button type='primary'>修改信息</Button>
                            </div></div>
                        }
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}