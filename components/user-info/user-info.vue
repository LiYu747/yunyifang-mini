<!-- 用户信息展示组件 -->
<template>
	<view class="user-info">
		<view class="head">
			<view class="head-top"></view>
			<view class="head-bottom"></view>
			<view class="head-content">
				<image class="img" :src="arr.headPic" mode="aspectFit"></image>
				<view class="name">
					<text style="margin-right: 10rpx;font-weight: bold;">{{arr.nickName}}</text>
					<text :class="arr.gender === 1 ? 'dv':'gril'" class="iconfont icon-xingbienan"></text>
				</view>
				<!-- <view class="company">{{arr}}</view>
				<view class="job">总经理秘书</view> -->
			</view>
		</view>
		<view class="content">
			<view class="row" @click="toProfile">
				<view class="left">
					<text class="iconfont icon-wode"></text>
					<text class="desc">基础信息</text>
				</view>
				<text class="right iconfont icon-zuojiantou"></text>
			</view>
	<!-- 		<view class="row" @click="toCheckFace">
				<view class="left">
					<text class="iconfont icon-zaixianduibijihuo"></text>
					<text class="desc">人证对比</text>
					<text class="pass" style="color: #DC143C;font-size: 24rpx;">未通过</text>
				</view>
				<text class="right iconfont icon-zuojiantou"></text>
			</view> -->
	<!-- 		<view class="row" @click="toMyCar">
				<view class="left">
					<text class="iconfont icon-cheliang"></text>
					<text class="desc">我的车辆</text>
				</view>
				<text class="right iconfont icon-zuojiantou"></text>
			</view> -->
			<view class="row" @click="toSubscribe">
				<view class="left">
					<text class="iconfont icon-4-141"></text>
					<text class="desc">我的云访</text>
				</view>
				<text class="right iconfont icon-zuojiantou"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			arr:{
				type: Object,
				required: true
			}
		},
		methods: {
			// 点击基础信息跳转个人信息维护页面
			toProfile() {
				uni.navigateTo({
					url: '/pages/profile/profile?id=' + this.arr.id 
				})
			},
			// 点击我的云访跳转预约界面
			toSubscribe() {
				uni.navigateTo({
					url: '/pages/subscribe/subscribe'
				})
			},
			// 点击我的车辆跳转我的车辆页面
			toMyCar() {
				uni.navigateTo({
					url: '/pages/my-car/my-car'
				})
			},
			// 点击认证对比跳转人证对比
			toCheckFace() {
				uni.navigateTo({
					url: '/pages/check-face/check-face'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-info{
		width: 100%;
		height: calc(100vh - 100rpx);
		.head{
			height: 300rpx;
			position: relative;
			.head-top{
				height: 200rpx;
				background-color: $bgcolor;
			}
			.head-bottom{
				height: 100rpx;
				background-color: rgba(18,150,219,.4);
			}
			.head-content{
				width: 700rpx;
				height: 250rpx;
				background-color: #fff;
				box-shadow: $boxshadow;
				border-radius: 20rpx;
				margin: auto;
				margin-top: -200rpx;
				position: relative;
				font-size: 28rpx;
				text-align: center;
				.img{
					width: 100rpx;
					height: 100rpx;
					margin-top: -50rpx;
				}
				.name{
					margin: 20rpx 0;
				}
				.company{
					margin-bottom: 20rpx;
					color: #7B68EE;
				}
				.job{
					@extend .company;
				}
			}
		}
		.content{
			width: 700rpx;
			height: 650rpx;
			margin: auto;
			margin-top: 100rpx;
			border-radius: 20rpx;
			box-shadow: $boxshadow;
			padding: 20rpx;
			box-sizing: border-box;
			.row{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30rpx;
				color: #333;
				padding: 30rpx 0;
				font-weight: bold;
				.left{
					.iconfont{
						margin-right: 20rpx;
						color: $bgcolor;
					}
					.desc{
						margin-right: 30rpx;
					}
				}
				.right{
					color: $bgcolor;
				}
			}
		}
	}
	.dv{
	color: #66ccff;	
	}
	.gril{
		color: #ff66ff;
	}
</style>
