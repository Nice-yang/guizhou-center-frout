

import axios from 'axios'
import store from '../store/index.js'
import router from '../router/router';
import { Message } from 'element-ui'
import $ from 'jquery';

axios.defaults.withCredentials = true;
// 添加请求拦截器
function getToken(){
    if (localStorage.getItem("tokens")!=null || localStorage.getItem("tokens")!='') {
        const instance = axios.create();
        instance.defaults.headers.common['token'] =localStorage.getItem("tokens");
    }else{
        const instance = axios.create();
        console.log(instance,'instance')
        instance.defaults.headers.common['token'] ='1234';
    }
    /*const instance = axios.create();
    instance.defaults.headers.common['token'] ='';*/
};
getToken();
/**
 * http拦截器
 * Add a request interceptor
 */
let timer;
let adiosPromiseArr=[]; //储存cancel token
axios.interceptors.request.use(function (config) {
    // @ts-ignore
    if(config.url.indexOf('open/login/validate')!=-1 ||config.url.indexOf('open/login/listTeam')!=-1){
        config.headers.common['auth-token'] =localStorage.getItem("token");
        config.headers.common['auth-biz-id'] =localStorage.getItem('authBiz.id');
        config.headers.common['auth-biz-type'] =1;
    }
    getToken();
    config.cancelToken = new axios.CancelToken(cancel => {
        // @ts-ignore
        adiosPromiseArr.push({cancel})
    });
    /*if(config.url.indexOf("/hearbeat") == -1){
        clearInterval(timer);
        //心跳接口，用以保持服务器端的session
        let time = 0;
        timer = setInterval(() => {
            time++;
            if(time>=24){
                clearInterval(timer);
            }else{
                hearbeat().then((res) => {})
            }
        }, 1200000)
    }*/

    // config.url += '?v='+Math.random();
    return config;
}, function (error) {
// Do something with request error
    return Promise.reject(error);
});




// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if (response) {
        switch (response.data.code) {
            case 101:
                // 被踢状态
               Message.error(response.data.message);
                router.replace({
                    path: '/login',
                });
                break;
            case 401:
                router.replace({
                    path: '/login',
                });
                break;
            case 500:
                // 服务器内部错误
                if(!$('.el-message').hasClass('login-error')){
                   Message.error({message: '服务器内部错误！',customClass:'login-error'});
                }
                break;
            default:

                if(response.data.status === 'fail'){
                    Message.error(response.data.message);
                }
                break;
        }
    }
    return response;
}, function (error) {
    // Do something with response error
    switch (error.response.data.code) {

        case 401:
            if($('.el-message').css('display')=='none'){
                Message.error(error.response.data.message);
            }
            router.replace({
                path: '/login',
            });
            break;
        case 101://被踢下线
            Message.error(error.response.data.message);
            router.replace({
                path: '/login',
            });
            // return false;
            break;
    }
    return Promise.reject(error);
});
router.beforeEach((to, from, next) => {
    adiosPromiseArr.forEach((ele, index) => {
        // @ts-ignore
        ele.cancel();
        delete adiosPromiseArr[index]
    });
    next();
});

export default {}
