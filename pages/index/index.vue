<!-- 主页 -->
<template>
	<view class="index">
		<visitMsg title="今日待访记录" :msg="wxvisitList.myVisit" type=1></visitMsg>
		<visitMsg title="今日来访记录" :msg="wxvisitList.myVisited" type=2></visitMsg>
		<tabbar @sendIndex="sendIndex" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null,
				wxvisitList: [],
				currentIndex: 0
			}
		},
		onLoad() {
			this.login()
		},
		methods: {
			sendIndex(index) {
				this.currentIndex = index;
				console.log(index, "0-------")
				if (index == 2) {
					uni.navigateTo({
						url: "/pages/common-user/common-user"
					})
				}
			},
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
					this.wxvisitList = res;
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
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
</style>
