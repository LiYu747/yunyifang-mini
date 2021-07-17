<!-- 普通用户页面 -->
<template>
	<view class="common-user">
		<view class="content">
			<my-visit v-if="currentIndex === 0" />
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
				currentIndex: 0
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
			height: calc(100% - 100rpx);
		}
	}
</style>
