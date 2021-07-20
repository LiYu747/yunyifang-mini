<!-- 普通用户页面 -->
<template>
	<view class="common-user">
		<view class="content">
			<my-visit  :arr="arr" v-if="currentIndex === 0" />
			<!-- <visit-me v-show="currentIndex === 1"/> -->
			<user-info :arr="arr.userInfo" v-if="currentIndex ==2" />
		</view>
		<tabbar  @sendIndex="sendIndex" />
	</view>
</template>

<script>
	import { INTERVIEWEE_STATUS } from '@/utils/constant'
	export default {
		data() {
			return {
				currentIndex: 0,
				arr:{
				dater:0,
				userInfo:null,
				myVisit:[],
				myVisited:[]}
			}
		},
	
		methods: {
			//获取今天时间
			getdate() {
				let nowDate = new Date()
				let date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate(),
				}
				if (date.month < 10) {
					date.month = "0" + date.month
				}
				this.arr.dater = date.year + '年' + date.month + '月' + date.date + '日'
			},
			login() {
				let _this = this,
					code = null;
				uni.login().then(res => {
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
					_this.openId = res.data.openId
					if (!res.data.id) {
						this.bindGetUserInfo()
					} else {
						this.arr.userInfo = res.data
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
							_this.arr.userInfo = res.data
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
			 //用户拜访来访信息
			 async getWxVisit() {
			   const res = await this.$api.wxvisitTobe(this.arr.userInfo.id) 
			 		console.log(res,'信息')
			 		res.data.myVisit.map( item => {
			 			item.intervieweeStatus = INTERVIEWEE_STATUS[item.intervieweeStatus];
			 			item.intervieweeStartTime = item.intervieweeStartTime.slice(0,16)
			 			item.intervieweeEndTime = item.intervieweeEndTime.slice(11,16)
			 			item.visitTime = item.intervieweeStartTime + ' - ' + item.intervieweeEndTime
			 		})
			 		res.data.myVisited.map(item => {
			 			item.intervieweeStatus = INTERVIEWEE_STATUS[item.intervieweeStatus];
			 			item.intervieweeStartTime = item.intervieweeStartTime.slice(0,16)
			 			item.intervieweeEndTime = item.intervieweeEndTime.slice(11,16)
			 			item.visitTime = item.intervieweeStartTime + ' - ' + item.intervieweeEndTime
			 		})
			 		this.arr.myVisit = res.data.myVisit;
			 		this.arr.myVisited = res.data.myVisited;
					console.log(this.arr);
			 },
			
			sendIndex(index) {
				console.log(index)
				if (index == 1) {
					uni.scanCode({
						success: function(res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
						}
					});
				}
				this.currentIndex = index
			}
		},
		onLoad() {
			this.login()
			// 判断第一次登录进入时候有没有填写信息
			// uni.getStorage({
			// 	key: 'userInfo',
			// 	fail() {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '请先填写信息',
			// 			duration: 2000,
			// 			success() {
			// 				uni.navigateTo({
			// 					url: '/pages/profile/profile'
			// 				})
			// 			}
			// 		})
			// 	}
			// })
		},
		onShow() {
			this.getdate()
			if(!this.arr.userInfo) return;
			this.getWxVisit()
		},
	}
</script>

<style lang="scss" scoped>
	.common-user {
		height: 100vh;

		.content {
			margin-bottom: 100rpx;
		}
	}
</style>
