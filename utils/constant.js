// 小程序appId
export const APPID = 'wx0fe051b5f96d9d38';
// 微信公众授权URL
export function getWxAuthUrl() {
	// snsapi_userinfo 非静默授权
	// snsapi_base 静默授权
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
}
// 接口HOST
//export const HOST = '192.168.0.102:8765'; // 开发测试公网
export const HOST = 'cev.liephipps.com'; // 开发测试公网
export const API_BASE_URL = `https://${HOST}`;

// SOCKET地址
// export const TEST_WEBSOCKET_HOST = 'localhost';
export const TEST_WEBSOCKET_HOST = HOST;

export const INTERVIEWEE_STATUS = {1: '待审核', 2: '已通过', 3: '未通过'}

export const IDCAR_TYPE = {1:' 身份证',2: '护照',3: '驾驶证'}

export const Reason_TYPES = [{titel:'面试',id:1},{titel:'商务拜访',id:2},{titel:'政务拜访',id:3},{titel:'探亲',id:4},{titel:'参观',id:5}]
 