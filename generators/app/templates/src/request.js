import { Auth } from 'components_fe'

const PERIFXS = {
    "daily": "http://daily.account.hetu.xuelangyun.com/hetu_user_be"
}
const URLS = {
    "daily": [
        ['login', 'post', '/v1/login'], 
        ['verificationCode','post','/v1/verification_code'],
        ['register','post','/v1/register']
    ]
}

export const $request = Auth.request(PERIFXS, URLS,(res)=>{return res})