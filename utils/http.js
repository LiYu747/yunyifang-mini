import Request from 'luch-request'; //全局配置
import storage from '@/utils/storage'; //缓存
import { API_BASE_URL } from '@/utils/constant'; //接口地址

const http = new Request({
	mode: 'history',
	baseURL: API_BASE_URL,
	custom: {
		loading: true,
		auth: true,
	}
});

// 请求拦截器
http.interceptors.request.use(config => {
		if (config.custom.loading) {
			uni.showLoading({mask: true, title: "加载中..."});
		}
		config.header.cookie = storage.getCookie();
		return config;
	},
	error => {
		Promise.reject(error);
	});

// 响应拦截器
http.interceptors.response.use(response => {
		if (response.config.custom.loading) {
			uni.hideLoading();
		}
		const { data, header } = response;
		if (header && header['set-cookie']) {
			storage.setCookie(header['set-cookie']);
		}
		if (data && typeof data === "object") {
			if (data.code === 200) {
				return Promise.resolve(data.data);
			} else {
				uni.showToast({
					title: data.message,
					icon: 'none'
				});
				return Promise.reject(data);
			}
		} else {
			return Promise.reject(data);
		}
	},
	error => {
		console.log("error", error);
		if (error.config.custom.loading) {
			uni.hideLoading();
		}
		if (error.code === "ECONNABORTED") {
			uni.showToast({
				title: "请求超时,请检查网络",
			});
		}
		return Promise.reject({}); // 返回接口返回的错误信息
	});

export default http;
