import axios from '@/utils/http';

// export default {
// 登录
export const login = function(data) {
	return axios.post('/api/user/login', data);
}
// //获取openid
export const getOpen = function(code) {
	return axios.get(`/api/wx/third/getOpenid?code=${code}`)
}
// 获取用户信息
export const getUserInfo = function(openid) {
	return axios.get(`/api/wx/third/detail/?openid=${openid}`)
}
// 分页获取用户被拜访记录
export const getWxVisit = function(obj) {
	return axios.get(`/api/wx/wxvisit/page`, obj)
}
// 修改用户信息
export const setUser=function(user) {
	return axios.post(`/api/wx/wxuser`, user)
}
// 获取用户信息
export const getUser=function(id) {
	return axios.get(`/api/wx/wxuser?id=${id}`)
}
// 新增访客记录
export const addWxvisit=function(obj) {
	return axios.post(`/api/wx/wxvisit`, obj)
}
// 通过code查询用户信息
export const getUserInfos=function(code) {
	return axios.get(`/api/wx/third/userinfo?code=${code}`)
}
// 新增用户
export const addThird = function(obj){
	return axios.post(`/api/wx/third`,obj)
} 
// 獲取拜訪列表
export const wxvisitTobe=function(id){
	return axios.get(`/api/wx/wxvisit/tobe/${id}`)
}
// 查询拜访记录详情
export const wxvisitDetail=function(id){
	return axios.get(`/api/wx/wxvisit/${id}`)
}

// .}
