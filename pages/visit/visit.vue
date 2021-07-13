<!-- 我的到访页面 -->
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
			<van-notice-bar scrollable text="今日您一共有2个来访，1个拜访,本周接待人数：22人,本周拜访人数：2人" />
		</view>
		<view class="search">
			<input type="text" placeholder="请搜索关键字">
		</view>
		<visitMsg title="我的今日到访"></visitMsg>
		<visitMsg title="我的历史到访"></visitMsg>
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
			view{
				margin-bottom: 10rpx;
			}
			.notice{
				&>view:nth-child(2){
					display: flex;
					justify-content: space-between;
				}
			}
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
