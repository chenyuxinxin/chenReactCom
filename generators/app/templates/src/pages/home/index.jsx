 import React ,{}from 'react'
 import { LayoutCon } from 'components_fe'
 import style from './index.module.css'
 import greenCirle from './iconfontImg/yuandianGre.png'
 import redCirle from './iconfontImg/yuandianRed.png'
 import yellowCirle from  './iconfontImg/yuandianYel.png'

 export default function Home (){
 
    return (
        <>
        <div>
            <LayoutCon ></LayoutCon>
            <div className={style['home-page']}>
                <div className={style['home-left']}>
                    <div className={style['home-left-top']}>
                        <div className={style['home-left-top-title']}>最近使用的应用</div>
                        <div className={style['home-left-top-content']}>
                            <div className={style['home-recently-item']}>ASP高级排产</div>
                            <div className={style['home-recently-item']}>区域划分</div>
                        </div>
                    </div>
                    <div className={style['home-left-bottom']}>
                        <div className={style['home-left-bottom-content']}>
                            Advertising 
                        </div>
                    </div>
                </div>
                <div className={style['home-right']}>
                    <div className={style['home-right-top']}>
                        <div className={style['home-right-title']}>
                            公告
                        </div>
                        <div className={style['home-right-list']}>
                            <div className={style['home-right-list-item']}>
                                <img src={redCirle} style={{width:'16px',height:'16px'}}></img> <span>【公告：xxxxxxx 】</span>
                            </div>
                            <div className={style['home-right-list-item']}>
                                <img src={greenCirle} style={{width:'16px',height:'16px'}}></img> <span>【公告：xxxxxxx 】</span>
                            </div>
                            <div className={style['home-right-list-item']}>
                                <img src={redCirle} style={{width:'16px',height:'16px'}}></img> <span>【公告：xxxxxxx 】</span>
                            </div>
                            <div className={style['home-right-list-item']}>
                                <img src={yellowCirle} style={{width:'16px',height:'16px'}}></img> <span>【公告：xxxxxxx 】</span>
                            </div>
                            <div className={style['home-right-list-item']}>
                                <img src={redCirle} style={{width:'16px',height:'16px'}}></img> <span>【公告：xxxxxxx 】</span>
                            </div>
                            <div className={style['home-right-list-item']}>
                                <img src={yellowCirle} style={{width:'16px',height:'16px'}}></img> <span>【公告：xxxxxxx 】</span>
                            </div>
                            <div className={style['home-right-list-item']}>
                                <img src={greenCirle} style={{width:'16px',height:'16px'}}></img> <span>【公告：xxxxxxx 】</span>
                            </div>
                        </div>
                        <div className={style['undate-page-box']}> <div className={style['undate-page']}><span>上一页</span><span>下一页</span></div></div>
                    </div>
                    <div className={style['home-right-bottom']}>
                        <div className={style['home-right-bottom-title']}>
                            账户信息
                        </div>
                        <div className={style['home-right-bottom-list']}>
                            <div className={style['home-right-bottom-item']}>
                                <div className={style['accout-title']}>账户余额</div>
                                <div className={style['accout-count']}>CNY   0.00</div>
                                <div className={style['accout-btn']}><span>充值</span></div>
                            </div>
                            <div className={style['home-right-bottom-item']}>
                                <div className={style['service-title']}>已开通服务</div>
                                <div className={style['service-count-list']}>
                                <div className={style['service-count-item']}>ASP高级排产</div>
                                <div className={style['service-count-item']}>区域划分</div>
                                </div>
                                
                            </div>
                            <div className={style['home-right-bottom-item']}>
                                <div className={style['ticket-title']}>待处理工单</div>
                                <div className={style['ticket-count-list']}>
                                <div className={style['ticket-count-item']}> * 【工单1】</div>
                                <div className={style['ticket-count-item']}> * 【工单2】</div>
                                <div className={style['ticket-count-item']}> * 【工单3】</div>
                                <div className={style['ticket-count-item']}> * 【工单4】</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>       
        </>
    )
 }