
<template>
    <div class="login-wrap" id="login">
        <div class="header " style="position:relative;">
            <header class="login-header clearfix" id="login-header" @dblclick="windowSize" onselectstart="return false;" style="-moz-user-select:none;width:calc(100% - 112px)">

            </header>
            <div style="float:right;top:0%;right:0;position:absolute;z-index:120" class="handel absol">
                <span class="icon-handel" title="最小化" @click="showMiniSizes"></span>
                <span class="icon-handel max-window" title="还原" v-show="isMaxWindow" @click="showNomalSizes"></span>
                <span class="icon-handel normal-window" title="最大化" v-show="!isMaxWindow" @click="showMaxSizes"></span>
                <span class="icon-handel" title="关闭" @click="closeWindow"></span>
            </div>
        </div>


        <!-- 不规则亮点start -->
        <div id="particles-js"></div>

        <!-- 不规则亮点end -->
        <div class="login-star"></div>
        <div class="earth">
            <div class="inner-earth"></div>
            <div class="line-earth"></div>
            <div class="earth-light"></div>
            <div class="earth-light1"></div>
        </div>

        <div class="ms-login">
            <div class="ms-title"><img :src="logoTitle" alt=""></div>
            <el-form :model="loginForm" :rules="loginRules" v-show="!centerDialogVisible" ref="loginForm" label-width="0px" class="ms-content" style="display:block;">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入通行证账号">
                    </el-input>
                    <i class="el-icon-user select-icon"></i>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入您的密码" v-model="loginForm.password">
                    </el-input>
                    <i class="el-icon-pw select-icon"></i>
                </el-form-item>
                <el-form-item prop="server" class="server-path">
                    <el-select v-model="loginForm.server" name="serverPath" filterable allow-create default-first-option placeholder="服务器地址" popper-class="server-select" @change="serverChange" @blur="serverBlur">
                        <el-option v-for="item in addressOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    <i class="el-icon-address select-icon"></i>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" class="login-btn-bg" :loading="loading" @click.native.prevent="getCompany">登 录</el-button>
                </div>
                <div class="tips">
                    <el-checkbox-group v-model="automaticLogin" style="display:inline-block;width:50%;margin-left: 6px;">
                        <el-checkbox label="记住密码" name="type" />
                    </el-checkbox-group>
                    <span style="float:right;margin-right: 6px;"><a href="http://passport.luban.com/luban-pass/html/regist.html" target="_blank">注册</a><span class="split-icon"></span><a href="http://passport.luban.com/luban-pass/html/phone-find-pass.html" target="_blank">忘记密码</a></span>
                </div>
            </el-form>
            <el-form  v-if="centerDialogVisible" label-width="0px" class="ms-content select-company">
                <span>选择企业</span>
                <el-form-item>
                    <el-select popper-class="drop-select-company" v-model="currentCompany" placeholder="请选择" @change="companyInfos">
                      <el-option v-for="item in companyOptions" :key="item.epid" :label="item.epid_name" :value="item.epid">
                      </el-option>
                    </el-select>
                    <el-row :gutter="25" class="footer">
                        <el-col :span="12">
                            <el-button type="ok" @click="handleLogin();">确 定</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="cancel" @click="centerDialogVisible = false">取 消</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import md5 from 'js-md5';
import "../../../public/static/css/main.css";
import { getCompanyList, login } from "../../api/getData-mll.ts"; //接口
// import {operationLog} from "../../api/getData";
import { startConfig } from "../../../public/static/js/jqueryparticles/js/app.js";
 // import {isMaxSized,showNomalSize,showMiniSize,closeMainWindow,showMaxSize} from "../../utils/clientApi.js";
var timmerHandle = null;
var isDrag = false;
export default {
    data: function() {
        const validateUsername = (rule, value, callback) => {
            if (value == '' || value.trim() == '') {
                callback(new Error('请输入用户名'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if ((value.length>0) && (value.length< 6)) {
                callback(new Error('密码不能小于6位'))
            } else if(value.length === 0){
                callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }
        return {
            logoTitle:'../assets/img/logo-title.png',
            automaticLogin: false,
            form: {},
            loginForm: {
                username: "",
                password: "",
                server: ''
            },
            loginRules: {
                username: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateUsername
                }],
                password: [{
                    required: true,
                    trigger: 'blur',
                    validator: validatePass
                }],
                server: [{
                    required: true,
                    trigger: "change",
                    message: '请选择服务器地址'
                }]
            },
            companyOptions: [],
            currentCompany: '',
            centerDialogVisible: false,
            addressOptions: window.serverPath,
            isMaxWindow:true,   //是否是最大屏
            loading:false,//加载中
            logParam:{
                dept_id:"",
                top_category:"",
                sub_category:"",
                function:"",
                oper_object:"",
                oper_ppids:[],
                oper_projtypes:[],
                operws_ids:[],
                remarks:""
            },
        };
    },
    methods: {
        // 记录日志
        getOperationLog(params){
            operationLog(params).then((data)=>{
                console.log(data.data.data)
            })
        },
        companyInfos(val){
            console.log(val,'123');
            let currentInfos = {
                epid: 0,
                epid_name: ""
            };
            for(let i = 0;i<this.companyOptions.length;i++){
                if(this.companyOptions[i].epid == val){
                    currentInfos = this.companyOptions[i];
                }
            }
            sessionStorage.setItem('companyInfo',JSON.stringify(currentInfos));
        },
        //服务器地址选择后记住
        serverChange(){
            localStorage.setItem("lastSelectSever",this.loginForm.server);
        },
        serverBlur(data){
            let serverPath = $("input[name='serverPath'").val();
            // console.log(serverPath,'serverPath')
            this.loginForm.server = serverPath;
            // console.log(data,'serverBlur')
            console.log(this.loginForm.server,'serverBlurdata')
        },
        //阻止用户频繁按登录
        debounce(fn, time) {
            let startTime = 0;
            return function(...args) {
                let curTime = new Date();
                if (curTime - startTime >= time) {
                    fn.apply(this, args);
                    startTime = curTime;
                }
            }
        },
        //获取公司列表
        getCompany() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    let loginForm = {};
                    loginForm.username = this.loginForm.username;
                    loginForm.password = md5(this.loginForm.password);
                    localStorage.setItem('serverPath',this.loginForm.server); // 本地存储serverpath
                    getCompanyList(loginForm).then((res) => {
                        this.companyOptions = res.data.data;
                        console.log(this.companyOptions,'this.companyOptions')
                        if (this.companyOptions.length > 1) { // 多企业
                            this.currentCompany = this.companyOptions[0].epid;
                            this.centerDialogVisible = false;
                            this.centerDialogVisible = true;
                        } else { // 单企业
                            this.currentCompany = this.companyOptions[0].epid;
                            this.handleLogin();
                        }
                        sessionStorage.setItem('companyInfo', JSON.stringify(this.companyOptions[0]));
                    })
                }
            });
            this.$refs.loginForm.validate(valid => {

            });
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let loginForm = {};
                    loginForm.username = this.loginForm.username;
                    loginForm.password = md5(this.loginForm.password);
                    loginForm.epid = this.currentCompany;
                    login(loginForm).then((res) => {
                        this.loading = false;
                        if (res.data.status == 'success') {
                            localStorage.setItem('tokens', res.data.data.token);
                            localStorage.setItem('loginInfo',JSON.stringify(res.data.data));
                            sessionStorage.setItem('isSave',1);
                            // 接口统一加token
                            const instance = axios.create();
                            instance.defaults.headers.common["token"] = res.data.data.token;
                            this.logParam.oper_object = '登录系统';
                            this.logParam.function = '登录指挥中心系统';
                            this.logParam.top_category = '登录';
                            // this.getOperationLog(this.logParam);
                            // 当前登录的角色 MEMBER:电销人员 ，MANAGER:电销经理 ,
                            // 使用客服登录的时候客户管理列表的销售人员字段不用展示筛选列表
                            this.$cookies.set("username", loginForm.username);
                            this.$cookies.set("role_name", res.data.data.role_name);
                            this.$cookies.set("password_cim", this.loginForm.password);
                            this.loading = true;
                            if (this.automaticLogin) {
                                this.$cookies.set("password", this.loginForm.password);
                                this.$cookies.set("automaticLogin", this.automaticLogin);
                                this.$cookies.set("formwhere", "formLogin");
                                this.$cookies.set("formwhereUrl", window.location.origin);
                            } else {
                                this.$cookies.set("automaticLogin", "");
                            }
                            this.$message({
                                message: '登录成功',
                                type: 'success',
                                duration: 1000
                            });
                            this.$router.push('/first');
                        } else {
                            // this.$message({
                            //     message: 'error',
                            //     type: 'error',
                            // })
                        }
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    // console.log('error submit!!')
                    return false;
                }
            })
        },
        clickAAA() {
            let aa = {
                username: "wangwu",
                password: "1234"
            };
            login(aa).then(res => {
                //if (res.data.status == "success") {
                const instance = axios.create();
                instance.defaults.headers.common["token"] = res.data.data.token;
                groupstructure().then(res => {});
                //}
            });
        },

        //初始化是否是最大窗口
        isMaxSizeds(){
            let self = this;
            isMaxSized(function(isMax){
                self.isMaxWindow = isMax;
            })
        },
        //窗口最大化
        showMaxSizes() {
            this.isMaxWindow = true;
            getScreenInfos(function(infos){
                // console.log(JSON.stringify(infos));
                let rect = {x:0, y:0, w:0, h:0};
                for(var i = 0; i < infos.length; i++){
                    rect.w += infos[i].rect.w;
                    rect.h = infos[i].rect.h;
                }
                rect.h -= 40;
                if(infos.length>1){
                    setGeometry(rect);
                }else{
                    showMaxSize();
                }

            });
        },
        //窗口最小化
        showMiniSizes() {
            showMiniSize();
        },
        //窗口恢复正常
        showNomalSizes() {
            this.isMaxWindow = false;
            getScreenInfos(function(infos){
                console.log(JSON.stringify(infos));
                let rect = {x:0, y:0, w:1600, h:900};
                for(var i = 0; i < infos.length; i++){
                    rect.x = (infos[i].rect.w - rect.w)/2;
                    rect.y = (infos[i].rect.h -rect.h)/2;
                }
                // rect.h -= 40;
                if(infos.length>1){
                    setGeometry(rect);
                }else{
                    showNomalSize();
                }

            });
        },
        //关闭窗口事件
        closeWindow(){
            closeMainWindow();
        },
        //窗口双击执行 窗口改变执行响应的方法
        windowSize(){
            let self = this;
            isMaxSized(function (val) {
                if (val) {
                    showNomalSize();
                    self.isMaxWindow = false;
                }
                else {
                    showMaxSize();
                    self.isMaxWindow = true;
                }
            });
        },
        /**
        * @param {eventObj}     触发元素
        * @event {onmousedown}  鼠标按下
        * @event {onmousemove}  鼠标移动
        * @event {onmouseup}    鼠标弹起
        * */
        initHeader(eventObj) {
            let self = this;
            eventObj.onmousedown = function (e) {//鼠标按下元素header 执行拖拽
                if (e.button != 0 || e.target.tagName !== "HEADER") return;
                isDrag = false;
                timmerHandle = setTimeout(setDragTrue, 50);

            }
            function setDragTrue() {//是否是拖拽事件 判断依据条件
                isDrag = true;
            }
            eventObj.onmousemove = function (e) {
                if (!isDrag) return;
                dragMainWindow(function (val) {//执行窗口拖拽
                    if (!val) self.setMaxState();
                    else self.setNormalState();
                });
                e.preventDefault();

            }
            eventObj.onmouseup = function (e) {//拖拽结束

                if (!isDrag) {
                    clearTimeout(timmerHandle);
                }
                else {
                    isDrag = false;
                    e.preventDefault();
                }
            }
        },
        setMaxState() {//窗口最大化-正常的变化
            // showNomalSize();
            console.log('123','min');
            this.isMaxWindow = false;
        },

        setNormalState() {//正常化-最大化的变化
            // showMaxSize();
            console.log('456','min');
            this.isMaxWindow = true;
        },
    },
    watch: {
        'loginForm.username': function (newVal,oldVal) {
            if(oldVal && newVal!=oldVal){
                this.loginForm.password = '';
            }
        }
    },
    created() {
        this.$cookies.get("automaticLogin") ? this.automaticLogin = true : this.automaticLogin = false;
        this.$cookies.get("username") ? this.loginForm.username = this.$cookies.get("username") : this.loginForm.username = '';
        this.$cookies.get("password") ? this.loginForm.password = this.$cookies.get("password") : this.loginForm.password = '';
        // 已经登录的情况下，再次验证登录并直接跳转，暂注释 勿删！！！！
        // if (this.$cookies.get("formwhere") && this.$cookies.get("automaticLogin") && this.$cookies.get("username") && this.$cookies.get("password")) {
        //     let baseUrlForm = window.location.origin;
        //     if (this.$cookies.get("formwhere") == 'formLogin' && baseUrlForm == this.$cookies.get("formwhereUrl")) {
        //         console.log(baseUrlForm, 'baseUrlForm')
        //         let vm = this;
        //         setTimeout(function() {
        //             vm.handleLogin()
        //         })
        //     }
        // } else {
        //     this.$cookies.set("password", '');
        // }
        //阻止用户频繁点击登录
        // this.handleLogin = this.debounce(this.handleLogin, 500)
        // document.onkeydown = (event) => {
        //     if (event.keyCode == 13) {
        //         this.handleLogin()
        //     }
        // }
    },
    beforeDestroy(){
        this.loading = false;
    },
    mounted() {
        sessionStorage.setItem('incommandCenter',false);
        localStorage.setItem('refresh',false);
        sessionStorage.setItem('deptID',null);
        sessionStorage.setItem('treeClick',null);
        if(localStorage.getItem('logout')==1){
            localStorage.setItem('logout',0);
            this.$router.go(0);

        };
        // this.reload();
        //默认选择上次选中的服务器信息
        if(localStorage.getItem("lastSelectSever")){
            this.loginForm.server = localStorage.getItem("lastSelectSever");
        }
        //api调用
        particlesJS('particles-js',
            startConfig
        );

        let params1 = {
            "username": "hubiao",
            "password": "96e79218965eb72c92a549dd5a330112",
            "epid": 1072
        }
        // login(params1).then((res) => {
        //     console.log('success')
        // })
        // this.isMaxSizeds();     //登录窗口最大化
        this.initHeader(document.getElementById('login-header'));//支持login命令栏拖拽
    }
};

</script>
<style>
.el-select .el-input>input {
    height: auto !important;
}

.el-form-item__error {
    padding: 0 0 0 5px;
}

</style>
<style scoped>
.select-icon {
    vertical-align: middle;
    display: inline-block;
    z-index: 99999;
}

.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../../public/static/img/login_bg.jpg) no-repeat;
    background-size: cover;
    overflow: hidden;
}

.login-star {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../../public/static/img/login_star.png) no-repeat;
    background-size: cover;
    top: 0;
}

.earth {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    /*background: url(../../../public/static/img/line_earth.png) no-repeat;*/
    background-size: contain;
}

.inner-earth {
    position: absolute;
    width: 882px;
    height: 882px;
    bottom: -707px;
    background: url(../../../public/static/img/inner_earth.png) no-repeat;
    background-size: contain;
    margin: 0 auto;
    left: 50%;
    margin-left: -444px;
    animation: two 20s linear infinite;
}

@keyframes two {
    0%{
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(40deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.line-earth {
    position: absolute;
    width: 1276px;
    height: 571px;
    bottom: 0;
    background: url(../../../public/static/img/line_earth.png) no-repeat;
    background-size: contain;
    margin: 0 auto;
    left: 50%;
    margin-left: -638px;
}

.earth-light {
    position: absolute;
    width: 1920px;
    height: 976px;
    bottom: 0;
    background: url(../../../public/static/img/earth_light.png) no-repeat;
    background-size: contain;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
}
.earth-light1 {
    position: absolute;
    width: 1920px;
    height: 150px;
    bottom: 0;
    background: url(../../../public/static/img/earth_light1.png) no-repeat;
    background-size: contain;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
}

.ms-title {
    width: 100%;
    line-height: 36px;
    font-size: 36px;
    color: #fff;
    margin-bottom: 20px;
    font-weight: 500;
    color: #e2eaff;
    text-align: center;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 49%;
    width: 432px;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    overflow: hidden;
}

.ms-content {
    box-sizing: border-box;
    padding: 50px;
    background: url(../../../public/static/img/login-box-bg.png) no-repeat;
    height: 441px;
    background-size: 100%;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 319px;
    height: 62px;
    margin: 10px auto;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
/*登录界面拖动*/
    .login-header{
        position:absolute;
        width:100%;
        height:49px;
        z-index:10;
        background:transparent;
        top: 0;
    }
.handel{
    padding:0 10px;
}
.handel .icon-handel {
    width: 20px;
    height: 20px;
    margin-top: 5px;
    display: inline-block;
    background: url('../../../public/static/img/icon-fun.png') no-repeat;
    margin-right:8px;
    margin-top:8px;
}

.handel .icon-handel:first-child {
    background-position: 0 0;
}

.handel .icon-handel.max-window {
    background-position: -20px 0px;
}
.icon-handel.normal-window{
    background-position: -100px 0px;
}

.handel .icon-handel:last-child {
    background-position: -40px 0px;
}

.handel .icon-handel:hover {
    background-position-y: -19px;
}
</style>
<style>
.ms-login .el-form-item__content {
    position: relative;
    height: 62px;
    line-height: 62px !important;
    width: 100%;
    box-sizing: border-box;
}

.ms-login .el-input--small {
    height: 62px;
    line-height: 62px !important;
}

.ms-login .el-input__inner {
    height: 62px;
    line-height: 62px !important;
    border: 0px;
    padding-left: 70px;
}

.ms-login .el-select {
    width: 100%;
}

.ms-login .select-icon {
    position: absolute;
    top: 20px;
    left: 23px;
    height: 23px;
    line-height: 23px;
    width: 34px;
    border-right: 1px solid #1f70d5;
    color: #909399;
    text-align: center;
    background: url(../../../public/static/img/login_icon.png) no-repeat;
}

.ms-login .el-icon-user {
    background-position: 0 0;
}

.ms-login .el-icon-pw {
    background-position: 0px -52px;
}

.ms-login .el-icon-address {
    background-position: 0px -102px;
}

.ms-login .el-input__inner,
.ms-login .el-input-group__prepend,
.ms-login .el-button--mini,
.el-button--small {
    border-radius: 0px !important;
    background: none;
    border: 0px;
}

.ms-login .login-btn-bg {
    background: url(../../../public/static/img/login-btn-bg.png);
    height: 48px !important;
    width: 323px !important;
}

.ms-login .login-btn-bg:hover {
    background: url(../../../public/static/img/login-btn-focus.png);
}

.ms-login .login-btn-bg span {
    color: #fff !important;
}

.ms-login .el-input {
    /* background:rgba(8,24,107,.52);
    border: 1px solid #1f70d5; */
    background: url(../../../public/static/img/login-input-bg.png) no-repeat;
    background-position: 0px -70px;
    background-size: 100%;
}

.ms-login .el-input__inner,
.ms-login input::-webkit-input-placeholder,
.ms-login .el-checkbox,
.ms-login span,
.ms-login .el-icon-arrow-up:before {
    color: #1f70d5 !important;
}

.ms-login .el-form-item {
    margin: 12px auto;
    width: 100%;
}

.ms-login .el-input__inner:focus {
    background: url(../../../public/static/img/login-input-bg.png) no-repeat;
    background-size: 100%;
}

.ms-login .el-checkbox__input.is-checked .el-checkbox__inner,
.ms-login .el-checkbox__inner::after,
.ms-login .el-checkbox__inner {
    background: #0f2074;
    border-color: #4d76ff;
}
.select-company .el-form-item {
    margin-top: 60px;
}

.select-company .el-select {
    width: 100%;
}
.select-company .footer {
  margin-top: 40px;
}
.ms-login .select-company .el-button {
  width: 100%;
  background: url(../../../public/static/img/btn_bg.png) no-repeat;
  border: none;
  background-size: 100%;
  height: 49px;

}
.ms-login .select-company .el-button:hover{
    width: 100%;
  background: url(../../../public/static/img/btn_active_bg.png) no-repeat;
  border: none;
  background-size: 100%;
  height: 48px;

}
.ms-login .select-company .el-button--cancel {
  width: 100%;
  background: url(../../../public/static/img/btn_bg.png) no-repeat;
  border: none;
  background-size: 100%;
  height: 48px;

}
.ms-login .select-company .el-button--cancel {
  width: 100%;
  background: url(../../../public/static/img/btn_bg.png) no-repeat;
  border: none;
  background-size: 100%;
  height: 49px;

}
.ms-login .select-company .el-input__inner {
    padding-left: 20px;
}
.ms-login .tips  a {
    color: #1f70d5;
}
.drop-select-company .el-select-dropdown__list {
    background: #08186b;
    padding: 0;
}
.drop-select-company {
    border: 1px solid #1f70d5;
}
.drop-select-company .el-select-dropdown__item.hover, .drop-select-company .el-select-dropdown__item:hover {
    background-color:#0d1661;
    color: #6a95eb;
}
.drop-select-company .el-select-dropdown__item {
    height: 40px;
    line-height: 40px;
    color: #1f70d5;
}
.el-scrollbar::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
}
.ms-login .split-icon {
    height: 13px;
    width: 1px;
    border-right: 1px solid #1f70d5;
    display: inline-block;
    margin: 0 7px;
}
.server-select{
    background-color: #08186b;
    border-color: #1f70d5;
}
.server-select ul li{
    background-color: #08186b;
    color: #1f70d5;
}
.server-select ul li:hover,.server-select ul li:active,.server-select .el-select-dropdown__item.hover{
    background-color: #0D1661;
    color: #1f70d5;
}
</style>
