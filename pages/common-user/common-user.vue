<!-- 普通用户页面 -->
<template>
	<view class="common-user">
		<user-empower @userInfo="userInfo"></user-empower>
		<view class="content">
			<my-visit :arr="arr" v-if="currentIndex === 0" />
			<!-- <visit-me v-show="currentIndex === 1"/> -->
			<user-info :arr="arr.userInfo" v-if="currentIndex ==2" />
		</view>
		<tabbar @sendIndex="sendIndex" />
	</view>
</template>

<script>
	import {INTERVIEWEE_STATUS} from '@/utils/constant';
	export default {
		data() {
			return {
				currentIndex: 0,
				arr: {
					dater: '',
					userInfo: {},
					myVisit: [],
					myVisited: []
				}
			}
		},

		methods: {
			async userInfo(e) {
				if (!e) return;
				this.arr.userInfo = await e
				if (this.arr.userInfo.id) {
					this.getWxVisit(this.arr.userInfo.id)
			    }

		    },
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
	
		//用户拜访来访信息
		async getWxVisit(id) {
			const res = await this.$api.wxvisitTobe(id)
			res.data.myVisit.map(item => {
				item.intervieweeStatus = INTERVIEWEE_STATUS[item.intervieweeStatus];
				item.intervieweeStartTime = item.intervieweeStartTime.slice(0, 16)
				item.intervieweeEndTime = item.intervieweeEndTime.slice(11, 16)
				item.visitTime = item.intervieweeStartTime + ' - ' + item.intervieweeEndTime
			})
			res.data.myVisited.map(item => {
				item.intervieweeStatus = INTERVIEWEE_STATUS[item.intervieweeStatus];
				item.intervieweeStartTime = item.intervieweeStartTime.slice(0, 16)
				item.intervieweeEndTime = item.intervieweeEndTime.slice(11, 16)
				item.visitTime = item.intervieweeStartTime + ' - ' + item.intervieweeEndTime
			})
			this.arr.myVisit = res.data.myVisit;
			this.arr.myVisited = res.data.myVisited;
			console.log(this.arr);
		},

		sendIndex(index) {
			if (index == 1) {
			wx.scanCode({
			  success: (res) => {
				   console.log(res);
				const isbn = res.result
				if (isbn) {
				  uni.navigateTo({   
					  url:'/pages/real-estate/real-estate'
				  })
				  }
				}
			})
			}
			this.currentIndex = index
		}
	},
	onLoad() {
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
			if(this.arr.userInfo.id){
				this.getWxVisit(this.arr.userInfo.id)
			}
			this.getdate()
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
