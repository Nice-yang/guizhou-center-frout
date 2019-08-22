import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import "./registerServiceWorker";

Vue.config.productionTip = false;
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
