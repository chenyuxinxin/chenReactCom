import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom'
import { Store, Auth } from 'components_fe'
import 'components_fe/dist/main.css'


/**
 * 根据页面来区分登陆的地址
 * TODO: remove this
 */


function getLoginUrl() {
    // 'http://localhost:3000/#/login'
    // 'http://console.hetu.xuelangyun.com/#/login'
    // 'http://daily.console.hetu.xuelangyun.com/#/login'
    return `${window.location.origin}/#/login`
}


// 设置登陆页面
Auth.setLoginUrl(getLoginUrl())

// 需要登陆设置白名单页面
// Auth.setWhitePages([ ])

/**
 * 初始化方法
 * @param {string} token 用户token
 */
function bootstrap(token) {
    console.log(token)
    ReactDOM.render(
        <Router>
            {
                Store.withGlobalStore(App)
            }
        </Router>,
        document.getElementById('root')
    );
}

// 是登陆页面的话，不做权限验证
// 如果不是登陆页面，则需要做权限验证
if(Auth.isWhitePage()) {
    bootstrap()
} else {
    Auth.checkAuth(bootstrap)
}