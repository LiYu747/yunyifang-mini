<!-- 小程序入口页面，授权登录 -->
<template>
	<view class="page-login">
		<view>
			<view class='login-header'>
				<image class="logo" mode="aspectFit" src="../../static/logo.png"></image>
			</view>
			<view class='content'>
				<view class="notice">申请获取以下权限:</view>
				<view class="notice-content">获得你的公开信息(昵称、头像、地区等)</view>
			</view>

			<view class="login-box">
				<button class='login-btn' type='primary' @click="bindGetUserInfo"> 授权登录
				</button>
			</view>
			<view class="register">
				<button :class="['register-btn',{agree:isAgree?'agree':''}]" :disabled="!isAgree"
					@click="toCompanyRegister">企业注册</button>
				<view class="agreement">
					<checkbox @click="changeIsAgree" :checked="isAgree" style="transform: scale(0.6);"></checkbox>
					<text class="read-agreement" @click="toAgreement">阅读注册协议</text>
				</view>
			</view>
		</view>
		<view class="desc" style="margin-top: 150rpx;">
			<itemDesc />
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
				userInfo: {}
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
					_this.openId = res.openId
					if (res.id) {
						console.log("跳轉頁面")
						uni.redirectTo({
							url: `/pages/common-user/common-user`,
						})
					}
				})
			})
			// 判断是否同意注册协议
			// console.log(1111111);
			// this.isAgree = getApp().globalData.isAgree;
			// const res = await FamilyApis.login({username: 'test', password: 'test'});
			// console.log(1111111222222222);
			// console.log(res);
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
						if(res.statusCode==200){
							uni.redirectTo({
								url:"/pages/common-user/common-user"
							})
						}else{
							uni.showModal({
								title:res.error
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
			// 点击企业注册跳转企业注册页面
			toCompanyRegister() {
				uni.navigateTo({
					url: "/pages/company-register/company-register"
				})
			},
			// 是否同意注册协议
			changeIsAgree() {
				this.isAgree = !this.isAgree
				getApp().globalData.isAgree = this.isAgree
			},
			//点击阅读注册协议跳转协议页面
			toAgreement() {
				uni.navigateTo({
					url: "/pages/agreement/agreement"
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.page-login {
		color: #333;

		.login-header {
			.logo {
				display: block;
				width: 300rpx;
				height: 300rpx;
				margin: 50rpx auto;
			}
		}

		.content {
			box-sizing: border-box;
			padding: 0 20rpx;
			margin-bottom: 60rpx;

			.notice {
				font-size: 32rpx;
				margin-bottom: 10rpx;
			}

			.notice-content {
				font-size: 28rpx;
			}
		}

		.login-box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.login-btn {
				font-size: 36rpx;
				width: 60%;
				height: 80rpx;
				line-height: 80rpx;
			}
		}

		// 企业注册
		.register {
			margin-top: 40rpx;

			.register-btn {
				margin-bottom: 20rpx;
				font-size: 36rpx;
				width: 60%;
				height: 80rpx;
				line-height: 80rpx;
			}

			.agree {
				border: 2rpx solid $comcolor;
				color: $comcolor;
				background-color: #fff;
			}

			.agreement {
				font-size: 28rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.read-agreement {
					color: $bgcolor;
				}
			}
		}
	}
</style>
