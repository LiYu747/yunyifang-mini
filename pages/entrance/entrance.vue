<!-- 小程序入口页面，授权登录 -->
<template>
	<view class="page-login">
		<view v-if="isEmpower == true" class="conbox flex flex-d al-center">
			<view class="conTil">
				温馨提示
			</view>
			<view class="conTil m-t2">
				应国家法律要求,需获取您的微信用户信息
			</view>
			<view class="conTil">
				用于实名认证及会员服务
			</view>
			<view class="conTxt m-t2">
				我们将严格保密绝不外泄您的隐私信息,更不会发送垃圾信息对您造成骚扰，若您的手机号未注册,将为您直接注册注册视为同意《云易访用户协议》和《隐私协议》
			</view>
			<view class="flex ju-center m-t3">
				<view class="btn flex al-center ju-center">
					再想想
				</view>
				<view class="gobtn flex al-center ju-center">
					去授权
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import request from '@/utils/request.js';
	import api from '@/apis/family.js';
	// const app = getApp();
	export default {
		data() {
			return {
				isAgree: false, // 是否同意注册协议
				sessionKey: '',
				openId: '',
				nickName: null,
				avatarUrl: null,
				userInfo: {},
				isEmpower: false, //是否有权限
			};
		},
		onLoad() {
			let _this = this;
			let code = null;
			uni.login().then(res => {
				res.forEach(item => {
					if (item && item.code) {
						code = item.code
					}
				})
				this.$api.getUserInfos(code).then(res => {
					_this.openId = res.data.openId
					if (!res.data.id) {
						this.isEmpower = true
						return;
					}
					console.log("跳轉頁面")
					uni.redirectTo({
						url: `/pages/common-user/common-user`,
					})

				})
			})
		},
		methods: {
			// 授权登录
			async bindGetUserInfo() {
				let _this = this;
				try {
					// 授权拿取用户信息
					let profile = await this.getUserProfile()
					console.log(profile, "-----");
					this.userInfo = profile.userInfo
					this.$api.addThird({
						openId: _this.openId,
						gender: profile.userInfo.gender,
						nickName: profile.userInfo.nickName,
						headPic: profile.userInfo.avatarUrl,
						city: profile.userInfo.city,
						country: profile.userInfo.country,
						province: profile.userInfo.province
					}).then(res => {
						if (res.statusCode == 200) {
							uni.redirectTo({
								url: "/pages/common-user/common-user"
							})
						} else {
							uni.showModal({
								title: res.error
							})
						}
					})
					// 授权后登录获取code
					let loginCode = await this.getCode()
					let code = loginCode.code
					// 发起请求上传code和userInfo到后台获取token
					// this.getToken(code,this.userInfo)
					// uni.navigateTo({
					// 	url: '/pages/common-user/common-user'
					// })
				} catch (e) {
					console.log(e);
				}
			},
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
			},
			// 登录获取code
			getCode() {
				const that = this
				return new Promise((reslove, reject) => {
					uni.login({
						provider: 'weixin',
						success(res) {
							reslove(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			// 根据code请求后台获取token并且缓存
			async getToken(code, userInfo) {
				let res = await request('', {
					code,
					userInfo
				})
				const token = res.data.token
				uni.setStorage({ // 缓存token后跳转个人维护信息页面
					key: 'token',
					data: token,
					success() {
						uni.reLaunch({
							url: '/pages/profile/profile'
						})
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.page-login {
		width: 100%;
		height: 100vh;
		position: fixed;
		background: rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;

		.conbox {
			width: 100%;
			padding: 50rpx 20rpx;
			background: #fff;
			border-radius: 20rpx;
		}

		.conTil {
			font-weight: bold;
		}

		.conTxt {
			color: #666;
			font-size: 24rpx;
			width: 480rpx;
			padding: 0 10rpx;
			line-height: 40rpx;
		}

		.btn {
			width: 250rpx;
			height: 60rpx;
			border-radius: 30rpx;
			border: 1px solid rgb(31, 81, 143);
			color: rgb(31, 81, 143);
			margin-right: 50rpx;
		}

		.gobtn {
			width: 250rpx;
			height: 60rpx;
			border-radius: 30rpx;
			background: rgb(31, 81, 143);
			color: #FFF
		}
	}
</style>
