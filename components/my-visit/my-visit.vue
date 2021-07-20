<!-- 主页 -->
<template>
	<view class="page">
		<view class="swiper">
			<swiper class="" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<image :src="require('../../image/lunbotu.png')" class="itemImg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view> 
		<view class="notice">
			李云龙先生：您好，今天是2021-05-21日   天气：晴  气温：18-24摄氏度
		</view>
		<view class="Statistics">
			<view class="visitorNum">
				<view class="fz-30">
					3
				</view>
				<view class="fz-14">
					今日访客
				</view>
			</view>
			<view class="ReceptionNum">
				<view class="fz-30">
					22
				</view>
				<view class="fz-14">
					本周接待人数
				</view>
			</view>
			<view class="visitNum">
				<view class="fz-30">
					6
				</view>
				<view class="fz-14">
					本周拜访人数
				</view>
			</view>
		</view>
		<visitMsg title="我的今日访客"  :msg="msg"  type=1></visitMsg>
		<visitMsg title="我的历史访客" :msg="historyVist" type=2></visitMsg> 
		<view class="slogan flex flex-d al-center">
			<view class="">
				www.wearecaller.com
			</view>
			<view class="m-t1 m-b1">
			访云©四川利菲普斯科技有限公司
			</view>
			<view class="">
				©2021-2025 By Sichuan liephipps Technologies Co.，Ltd
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			userInfo: null,
			currentIndex: 0,
			msg:{
				type: Array,
				default:true
			},
			historyVist:{
				type:Array,
				default:true
			}
		},
		
		onShow() {
			console.log("进入")
			this.login()
		},
		methods: {
			login() {
				let _this = this,
					code = null;
				uni.login().then(res => {
					console.log(res, "----")
					res.forEach(item => {
						if (item && item.code) {
							code = item.code;
							_this.getUserInfo(code)
						}
					})

				})
			},
			getUserInfo(code) {
				let _this = this;
				this.$api.getUserInfos(code).then(res => {
					_this.openId = res.openId
					if (!res.id) {
						this.bindGetUserInfo()
					} else {
						this.userInfo = res
						this.getWxVisit()
					}
				})
			},
			// 授权登录
			async bindGetUserInfo() {
				let _this = this;
				try {
					// 授权拿取用户信息
					let profile = await this.getUserProfile()
					this.$api.addThird({
						openId: _this.openId,
						gender: profile.userInfo.gender,
						nickName: profile.userInfo.nickName,
						headPic: profile.userInfo.avatarUrl,
						city: profile.userInfo.city,
						country: profile.userInfo.country,
						province: profile.userInfo.province,
						thirdType: 1
					}).then(res => {
						if (res.statusCode != 200) {
							uni.showModal({
								title: res.error
							})
						} else {
							console.log(res, "----")
							_this.userInfo = res
							_this.getWxVisit()
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
			getWxVisit() {
				console.log("調用----", this.userInfo)
				this.$api.wxvisitTobe(this.userInfo.id).then(res => {
					console.log(res)
					// this.wxvisitList = res;
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.fz-30{
		font-size: 60rpx;
	}
	.fz-14{
		font-size: 24rpx;
	}
	.page{
		background: #F5F5F5;
	}
	.index {
		.swiper {
			image {
				width: 100%;
			}
		}

		.head {
			box-sizing: border-box;
			padding: 20rpx;
			font-size: 24rpx;
			color: #333;
		}

		.search {
			box-sizing: border-box;
			padding: 0 20rpx;

			input {
				display: block;
				border: 2rpx solid #aaa;
				padding: 8rpx 20rpx;
			}

			margin-bottom: 40rpx;
		}
	}
	.itemImg{
		width: 100%;
		height: 300rpx;
	}
	
	.notice{
		width: 720rpx;
		height: 60rpx;
		font-size: 24rpx;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
		padding-left: 30rpx;
		display: flex;
		align-items: center;
	}
	
	.Statistics{
		width: 690rpx;
		padding: 40rpx 30rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		.visitorNum{
			width: 190rpx;
			height: 150rpx;
			background: linear-gradient(#FFCEA7, #FCAA87);
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
		}
		.ReceptionNum{
			width: 190rpx;
			height: 150rpx;
			background: linear-gradient(#D0D7EE,#9EA6E9);
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
		}
		.visitNum{
			width: 190rpx;
			height: 150rpx;
			background: linear-gradient(#FFF8A9,#FFC15B);
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
		}
	}
	.slogan{
		padding: 30rpx 0;;
		font-size: 24rpx;
		color: #333;
	}
</style>
