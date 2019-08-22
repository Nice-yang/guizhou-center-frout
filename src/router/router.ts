
import Vue from 'vue';
import Router from 'vue-router';

// Router.prototype.goBack = function () {
//     this.isBack = true;
//     window.history.go(-1);
// };
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/main',
            component: resolve => require(['../views/Home.vue'], resolve),
            children: [

                {
                    //  大屏
                    path: '/commandcenter',
                    component: resolve => require(['../views/Home.vue'], resolve),
                    redirect: '/commandcenter/mainScreen',
                    children: [
                        {
                            path: '/commandcenter/mainScreen',
                            component: resolve => require(['../views/Home.vue'], resolve),
                            children:[{
                                path: '/commandcenter/mainScreen/monitor/:type/:id',
                                component: resolve => require(['../views/Home.vue'], resolve),
                            }]
                        },
                        {
                            path: '/commandcenter/monitor',
                            component: resolve => require(['../views/Home.vue'], resolve)
                        },
                    ]
                },

            ]
        },
        {
            // 登录
            path: '/login',
            component: resolve => require(['../views/Home.vue'], resolve)
        }

    ]
})

