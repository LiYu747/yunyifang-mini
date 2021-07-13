<!-- 分享成功页面 -->
<template>
	<view class="share-success">
		<view class="head">分享成功</view>
		<image class="success" src="../../static/img/share-success/share-success.png" mode="aspectFit"></image>
		<view class="notice">如果对方单位注册，您有机会获得千元奖励哦！</view>
		<image class="code" src="../../static/4.png" mode="aspectFit"></image>
		<view class="desc">我的二维码</view>
		<button type="primary" class="btn" @click="toHome">返回主页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			// 点击返回主页面回到主页面
			toHome() {
				const {roleType} = getApp().globalData
				if(roleType === 'assistant'){
					uni.navigateTo({
						url: "/pages/assistant/assistant"
					})
				}else if(roleType === 'guard'){
					uni.navigateTo({
						url: "/pages/guard/guard"
					})
				}else if(roleType === 'commonUser'){
					uni.navigateTo({
						url: "/pages/common-user/common-user"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.share-success{
		text-align: center;
		.head{
			color: #fff;
			font-size: 28rpx;
			height: 60rpx;
			line-height: 60rpx;
			background-color: #ff0000;
		}
		.success{
			width: 200rpx;
			height: 200rpx;
			margin: {
				top: 100rpx;
				bottom: 50rpx;
			};
		}
		.notice{
			font-size: 30rpx;
			color: #333;
		}
		.code{
			width: 300rpx;
			height: 300rpx;
			margin: 20rpx 0;
		}
		.desc{
			@extend .notice;
		}
		.btn{
			display: block;
			width: 50%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #fff;
			margin-top: 20rpx;
		}
	}
</style>
