import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import router from "./router/router";
import globalFilter from './filters/index';
import axios from './config/httpConfig';
import store from './store/index';
// import axios from './config/httpConfig';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(require('vue-cookies'));
Vue.prototype.$axios = axios;
// import './styles/index.scss';
// import "./registerServiceWorker";

Vue.config.productionTip = false;

for (var key in globalFilter) {
  // @ts-ignore
  Vue.filter(key, globalFilter[key])
}
Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
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
  store,
  render: h => h(App)
}).$mount("#app");
