<template>
	<view class="search">
		<view class="search-head">
			<input class="input" type="text" placeholder="请输入关键字">
			<text class="iconfont icon-sousuo"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.search{
		width: 100%;
		height: 100vh;
		.search-head{
			height: 100rpx;
			box-shadow: $boxshadow;
			display: flex;
			align-items: center;
			justify-content: center;
			common{
				display: block;
				border: 2rpx solid #eee;
				height: 60rpx;
				box-sizing: border-box;
			}
			.input{
				@extend common;
				width: 80%;
				border-right: 0;
				font-size: 24rpx;
				padding: 0 20rpx;
				border: {
					top-left-radius: 60rpx;
					bottom-left-radius: 60rpx;
				};
			}
			.iconfont{
				@extend common;
				width: 60rpx;
				font-size: 36rpx;
				color: #aaa;
				display: flex;
				justify-content: center;
				align-items: center;
				border-left: 0;
				border: {
					top-right-radius: 60rpx;
					bottom-right-radius: 60rpx;
				};
			}
		}
	}
</style>
