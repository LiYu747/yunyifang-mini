<!-- 受访人未注册，通过分享进入小程序 -->
<template>
	<view class="comein-noregister">
		<image class="logo" mode="aspectFit" src="../../static/logo.png"></image>
		<view class="notice">您有新的来访预约未处理，请立即处理。</view>
		<button class="register" type="primary" @click="login">授权登录</button>
		<view class="desc">
			<itemDesc />
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				userInfo: {}, // 用户信息
				token: '', 
			};
		},
		methods: {
			// 授权登录
			login() {
				this.getProfile()
			},
			// 获取授权信息
			getProfile() {
				const that = this
				uni.getUserProfile({
					desc: '登录',
					success(res) {
						console.log(res);
						that.userInfo = res.userInfo
						uni.login({
							provider: 'weixin',
							success(res) {
								const code = res.code
								console.log(code);
								that.getToken(code)
							}
						})
					}
				})
			},
			// 向后台发送code换取token
			async getToken(code) {
				// let res = await request('/ada',{code})
				let res = {data:{token: '46da5sd4asda45sda4sd'}}
				this.token = res.data.token
				const that = this
				uni.setStorage({
					key: 'token',
					data: that.token,
					success() {
						uni.reLaunch({
							url: '/pages/common-user/common-user'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comein-noregister{
		.logo{
			display: block;
			margin: 50rpx auto;
			width: 300rpx;
			height: 300rpx;
		}
		.notice{
			text-align: center;
			font-size: 28rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 50rpx;
		}
		.register{
			display: block;
			width: 60%;
			margin: 0 auto;
			height: 80rpx;
			line-height: 80rpx;
		}
		.desc{
			margin-top: 300rpx;
		}
	}
</style>
