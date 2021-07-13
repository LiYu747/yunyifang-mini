const USER_REGISTERED = 'user.registered';
const USER_OPENID = 'user.openid';
const USER_STATUS = 'user.status';
const USER_COOKIE = 'user.cookie';
const USER_INFO = 'user.info';
const ACCESS_INFO = 'access.info';

export default {
	setUserInfo(userInfo) {
		uni.setStorageSync(USER_INFO, userInfo);
	},
	getUserInfo() {
		return uni.getStorageSync(USER_INFO);
	},
	setRegistered(registered) {
		uni.setStorageSync(USER_REGISTERED, registered);
	},
	getRegistered() {
		return uni.getStorageSync(USER_REGISTERED);
	},
	setOpenid(openid) {
		uni.setStorageSync(USER_OPENID, openid);
	},
	getOpenid() {
		return uni.getStorageSync(USER_OPENID);
	},
	setUserStatus(status) {
		uni.setStorageSync(USER_STATUS, status);
	},
	getUserStatus() {
		return uni.getStorageSync(USER_STATUS);
	},
	setCookie(cookie) {
		uni.setStorageSync(USER_COOKIE, cookie);
	},
	getCookie() {
		return uni.getStorageSync(USER_COOKIE);
	},
	setAccessInfo(accessInfo) {
		uni.setStorageSync(ACCESS_INFO, accessInfo);
	},
	getAccessInfo() {
		return uni.getStorageSync(ACCESS_INFO);
	},
}
