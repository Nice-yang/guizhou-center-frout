/**
 * api接口
 */
import axios from "axios";

// let baseUrl = "http://192.168.3.103:8090/lubanocc/web";
let baseUrl = '';


//登录
// export const login = params => axios.post(`${baseUrl}/user/login`, params);
//获取集团信息
export const groupstructure = () => axios.get(`${baseUrl}/index/groupstructure`);
//获取系统时间
export const getTimes = params=>axios.get(`${localStorage.getItem('serverPath')}/news/nowTime`);
// GET /order/manage/getEnterpriseServiceList/{currentPage}/{pageSize} 分页获取企业服务列表
export const getOrderManagementList = params=> axios.get(`${params.url}/order/manage/getEnterpriseServiceList/${params.currentPage}/${params.pageSize}`);
// POST /order/manage/getBindingList 获取服务与硬件绑定列表
export const getProjects = params =>axios.post(`${params.url}rs/bimRest/getProjects`,params.param)
// PUT
export const componentUpdate = params=>axios.put(`${params.url}component/az/update/${params.param.productId}`,params.param.modify);
// GET 测试数据
export const cloudTree = params=> axios.get('../../static/js/datasource.json');


// 登录前获取企业列表
export const getCompanyList = params=> axios.post(`${localStorage.getItem('serverPath')}/web/getCompanyList`,params);

// 登录
export const login = params=> axios.post(`${localStorage.getItem('serverPath')}/web/login`,params);
// 登出
export const loginout = params=> axios.post(`${localStorage.getItem('serverPath')}/web/loginout`,params);

// 合约指标模块
export const getAreascale = params=> axios.get(`${localStorage.getItem('serverPath')}/contract/areascale`);
export const getCompletionRate = params=> axios.get(`${localStorage.getItem('serverPath')}/contract/completionRate`);
export const getPlan = params=> axios.get(`${localStorage.getItem('serverPath')}/contract/plan`);

// 物资采购模块
// 获取采集占比
export const getPurchaseAmount = params=> axios.get(`${localStorage.getItem('serverPath')}/purchase/scale/amount`);
// 获取材料采购占比
export const getPurchaseMaterial = params=> axios.get(`${localStorage.getItem('serverPath')}/purchase/scale/material`);
// 获取采购总金额
export const getPurchaseTotal = params=> axios.get(`${localStorage.getItem('serverPath')}/purchase/amount/total`);

// 经营状况模块
// 查询工程类型完成指标折线图
export const getManageCategory = params => axios.get(`${localStorage.getItem('serverPath')}/manage/category?type=${params}`);
// 获取地区完成指标接口
export const getManageAreascale = params=> axios.get(`${localStorage.getItem('serverPath')}/manage/output/areascale`);
// 获取累计完成产值接口
export const getManageOutput = params=> axios.get(`${localStorage.getItem('serverPath')}/manage/total/output`);
// 资金走势
// 查询资金走势折线图
export const getFundsCategory= params=> axios.get(`${localStorage.getItem('serverPath')}/funds/trend/category`);
// 查询资金走势柱状图
export const getFundsBar = params => axios.get(`${localStorage.getItem('serverPath')}/funds/trend/bar?type=${params}`);
//  查询资金走势利润指标进度条
export const getFundsProgressbar= params=> axios.get(`${localStorage.getItem('serverPath')}/funds/trend/progressbar`);
//  查询企业总收入和总支出
export const getFundsTotal= params=> axios.get(`${localStorage.getItem('serverPath')}/funds/trend/total`);

// 科研指标模块
// 获取优秀科研成果列表
export const getScientificExcellent= params=> axios.post(`${localStorage.getItem('serverPath')}/scientific/subject/excellent`,params);
// 获取近三年各级科研课题数量
export const getScientificAmount= params=> axios.get(`${localStorage.getItem('serverPath')}/scientific/subject/amount`);

//机械设备 - 智慧工地-车辆列表
export const getCarList = params=> axios.get(`${localStorage.getItem('serverPath')}/internetOfThings/car/list?currentPage=${params.page_num}&pageSize=${params.page_size}`);


//绿色施工 - 空气质量概况详情
export const environmentAirQualitySummary = params=> axios.get(`${localStorage.getItem('serverPath')}/environment/air/quality/summary`);

//机械设备 - 机械设备报警记录列表
export const internetOfThingsAlarmList = params=> axios.get(`${localStorage.getItem('serverPath')}/internetOfThings/alarm/list?currentPage=${params.page_num}&pageSize=${params.page_size}`);
//机械设备 - 查询设备总数和离线数接口
export const internetOfThingsAlarmCount = params=> axios.get(`${localStorage.getItem('serverPath')}/internetOfThings/alarm/count`);

