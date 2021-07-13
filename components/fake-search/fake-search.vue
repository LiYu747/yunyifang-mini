<!-- 假搜索框 -->
<template>
	<view class="fake-search">
		<view class="content" @click="toSearch">
			<text>请输入关键字</text>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			// 点击假搜索框跳转搜索页面
			toSearch(){
				uni.navigateTo({
					url: "/pages/search/search"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fake-search{
		box-sizing: border-box;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: $boxshadow;
		.content{
			box-sizing: border-box;
			width: 90%;
			height: 60rpx;
			display: flex;
			align-items: center;
			border: 1px solid #eee;
			border-radius: 60rpx;
			padding: 4rpx 20rpx;
			color: #eee;
			font-size: 28rpx;
			justify-content: space-between;
		}
	}
</style>
