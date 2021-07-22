import request from '@/utils/request.js';
class Emp {
	openId = '';
	id= '';
	
	constructor(arg) {
		
	}
	uerEmp() {
		let _this = this;
		let code = null;
		uni.login().then(res => {
			res.forEach(item => {
				if (item && item.code) {
					code = item.code
				}
			})
			request('/api/wx/third/userinfo', {
				code: code
			}).then((res) => {
				let data = res.data.data
				this.openId = data.openId
				this.id = data.id
				if (data.id) {
					uni.showModal({
						content: '请实名认证',
						success: (res) => {
							if (res.confirm) {
								this.bindGetUserInfo()
							}
						}
					})
					return;
				}
				
			})

		})
	}
	// 授权登录
	async bindGetUserInfo() {
		let _this = this;
		try {
			// 授权拿取用户信息
			let profile = await this.getUserProfile()
			console.log(profile, "-----");
			request('/api/wx/third',{
				openId: _this.openId,
				gender: profile.userInfo.gender, 
				nickName: profile.userInfo.nickName,
				headPic: profile.userInfo.avatarUrl,
				city: profile.userInfo.city,
				country: profile.userInfo.country,
				province: profile.userInfo.province
			}).then(res => {
				if (res.statusCode != 200) {
					uni.showModal({
						title: res.error
					})
					return;
				} 
				this.uerEmp()
			})
		} catch (e) {
			console.log(e);
		}
	}
	// 授权用户信息方法
	getUserProfile() {
		const that = this
		return new Promise((reslove, reject) => { 
			uni.getUserProfile({
				desc: '登录',
				success(res) {
					reslove(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
	
}
module.exports = new Emp
