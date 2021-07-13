<!-- 主页 -->
<template>
	<view class="index">
		<view class="swiper">
			<swiper indicator-dots autoplay indicator-active-color="#1296db">
				<swiper-item>
					<image src="../../static/logo.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/logo.png"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="head">
			<userGreetings />
			<van-notice-bar scrollable text="在你拜访的客人前面还有3位，预计45分钟，请耐心等待..." />
		</view>
		<view class="search">
			<input type="text" placeholder="请搜索关键字">
		</view>
		<visitMsg></visitMsg>
		<visitMsg title="历史拜访记录"></visitMsg>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		.swiper{
			image{
				width: 100%;
			}
		}
		.head{
			box-sizing: border-box;
			padding: 20rpx;
			font-size: 24rpx;
			color: #333;
		}
		.search{
			box-sizing: border-box;
			padding: 0 20rpx;
			input{
				display: block;
				border: 2rpx solid #aaa;
				padding: 8rpx 20rpx;
			}
			margin-bottom: 40rpx;
		}
	}
</style>
