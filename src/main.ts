import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import router from "./router/router";
import * as globalFilter from './filters/filters'
// import axios from './config/httpConfig';
import 'element-ui/lib/theme-chalk/index.css';
// import './styles/index.scss';
// import "./registerServiceWorker";

Vue.config.productionTip = false;

for (var key in globalFilter) {
  Vue.filter(key, globalFilter[key])
}
Vue.use(ElementUI);
router.beforeEach((to: any, from: any, next: any) => {
  if (to.name === 'login') {
    next({name: 'home/index'})
  } else {
    next()
  }
})
// Vue.prototype.$axios = axios;

// /**
//  * 创建 axios 实例
//  */
// const service = axios.create({
//     timeout: 3000,
//     baseURL: 'http://xxx',
// });

// /**
//  * req 拦截器
//  */
// service.interceptors.request.use((config: object): object => {
//     return config
// }, (error: any): object => {
//     return Promise.reject(error)
// });

// /**
//  * res 拦截器
//  */
// service.interceptors.response.use((response: any) => {
//     const res = response.data;
//     if (res.error) {
//         if (process.env.NODE_ENV !== 'production') {
//             console.error(res);
//         }
//         return Promise.reject(res);
//     }
//     return Promise.resolve(res);
// });
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
