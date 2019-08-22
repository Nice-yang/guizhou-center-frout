/**
 * api接口
 */
import axios from "axios";

// let baseUrl = "http://192.168.3.103:8090/lubanocc/web";

// //首页累计收入模块 - 获取累计收入、集团目标、累计成本、累计利润、完成率接口
// export const incomeTotal = () => axios.get(`${localStorage.getItem('serverPath')}/income/total`);
// //首页累计收入模块 - 获取集团组织树接口
// export const incomeGrouptree = () => axios.get(`${localStorage.getItem('serverPath')}/income/grouptree`);
// //树结构更新

// export const changeOrg = params=>axios.put(`${localStorage.getItem('serverPath')}/income/org/change/${params.type}/${params.deptId}`);
// //获取用户权限信息接口
// export const getUserOrgAuth = params=>axios.get(`${localStorage.getItem('serverPath')}/income/org/auth`);
// //更新视频
// // export const getCameraUrl = params=>axios.post(`${localStorage.getItem('serverPath')}/shiny/getCameraUrl`,params);
// export const getCameraUrl = (params,type)=>{
//       if(!type){
//           return axios.post(`${localStorage.getItem('serverPath')}/shiny/getCameraUrl`,params);
//       }  else{
//           return axios.get(`${localStorage.getItem('serverPath')}/shiny/smartsite/getCameraUrl?deptId=${params.deptId}&cameraId=${params.camerakey}`)
//       }
// };

// export const getWeather = params =>axios.get(`${localStorage.getItem('serverPath')}/environment/weather?cityId=${params.city_code}&cityName=${params.city}`);


// //中冶token
// export const getZhongyeAuthToken = params=>axios.post(`${window.zhongyeUrl}open/authorize/getAuthToken`,params);
// //中冶token_self
// //http://api-wisdom.qingzhuyun.com/wisdom-api/user/gettoken
// export const getZhongyeToken = params =>axios.post(`http://api-wisdom.qingzhuyun.com/wisdom-api/user/gettoken`,params);
// //中冶登陆验证
// export const getZhongyeVali = params=>axios.post(`${window.zhongyeUrl}open/login/validate`,params);
// //http://api-open.qingzhuyun.com/open/login/listTeam?userId=450602b7b0b14ba3967824407f3accfc
// export const getProject = params=>axios.get(`${window.zhongyeUrl}open/login/listTeam?userId = ${params.userId}`);


// //智慧工地-工地配置
// export const smartSiteInfo = params=>axios.get(`${localStorage.getItem('serverPath')}/iot/smartSite/info?orgId=${params.orgId}`);
// //操作日志
// export const operationLog = params=>axios.post(`${localStorage.getItem('serverPath')}/operation/log`,params);

