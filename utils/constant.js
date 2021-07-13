// 小程序appId
export const APPID = 'wxd9a6d485b0152a99';
// 微信公众授权URL
export function getWxAuthUrl() {
	// snsapi_userinfo 非静默授权
	// snsapi_base 静默授权
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
}
// 接口HOST
export const HOST = 'energy.sifangqian.club'; // 开发测试公网

export const API_BASE_URL = `http://${HOST}`;

// SOCKET地址
// export const TEST_WEBSOCKET_HOST = 'localhost';
export const TEST_WEBSOCKET_HOST = HOST;
