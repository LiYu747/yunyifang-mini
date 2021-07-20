<!-- 普通用户页面 -->
<template>
	<view class="common-user">
		<view class="content">
			<my-visit :msg="msg" :historyVist="historyVist"  v-if="currentIndex === 0" />
			<!-- <visit-me v-show="currentIndex === 1"/> -->
			<user-info v-if="currentIndex ==2" />
		</view>
		<tabbar @sendIndex="sendIndex" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				msg: [{
						id: '001',
						company: '深圳腾讯计算有限公司',
						boss: '马化腾',
						visitTime: '2021-5-14 10:20-11:00',
						visitState: '待通过',
						jurisdiction:0,
					},
					{
						id: '002',
						company: '百度计算系统有限公司',
						boss: '李彦宏',
						visitTime: '2021-5-14 10:20-11:00',
						visitState: '待通过'
					},
					{
						id: '003',
						company: '宇宙地球修理公司',
						boss: '李云龙',
						visitTime: '2021-5-14 10:20-11:00',
						visitState: '待通过'
					}
				],
				historyVist: [{
						id: '001',
						company: '深圳腾讯计算有限公司',
						boss: '马化腾',
						visitTime: '2021-5-14 10:20-11:00',
						visitState: '已完成',
						jurisdiction:1,
					},
					{
						id: '002',
						company: '百度计算系统有限公司',
						boss: '李彦宏',
						visitTime: '2021-5-14 10:20-11:00',
						visitState: '已完成',
						jurisdiction:1,
					},
					{
						id: '003',
						company: '宇宙地球修理公司',
						boss: '李云龙',
						visitTime: '2021-5-14 10:20-11:00',
						visitState: '已终止',
						jurisdiction:0,
					}
				]
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
		methods: {
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
		}
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
