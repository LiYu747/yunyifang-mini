<!-- 门岗守卫角色的门岗守卫页面 -->
<template>
	<view class="guard-only">
		<van-notice-bar scrollable text="今天您一共有2个来访，本周本门岗接待人数为22人，本周拜访人数为6人" />
		<!-- 扫描二维码区域 -->
		<view class="check-code" @click="checkCode">
			<text class="iconfont icon-saomiao"></text>
			<text class="notice">请将摄像头对准来访者的二维码，点击扫描</text>
		</view>
		<swiper class="swiper" autoplay indicator-dots indicator-active-color="rgb(26,173,25)">
			<swiper-item>
				<image src="../../static/logo.png" mode="aspectFit"/>
			</swiper-item>
			<swiper-item>
				<image src="../../static/logo.png" mode="aspectFit"/>
			</swiper-item>
		</swiper>
		<!-- 头部 -->
		<view class="head">
			<userGreetings />
		</view>
		<!-- 标签 -->
		<view class="tags">
			<text 
				v-for="(item,index) in tags" 
				:key="index" 
				@click="tagClick(index)"
				:class="'tag'+' '+(currentIndex == index ? 'tag-active' : '')"
			>{{item}}</text>
		</view>
		<visitMsg v-show="currentIndex == 0" title="今日已处理来访" />
		<visitMsg v-show="currentIndex == 1" title="历史来访记录" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tags: [
					'已通过核检',
					'历史访客'
				], // 标签
				currentIndex: 0, //记录当前点击tag的索引并保存
			}
		},
		onLoad() {
			
		},
		methods: {
			// 点击扫描开始扫描二维码
			checkCode() {
				uni.scanCode({
					onlyFromCamera: true,
					success(res) {
						console.log(res);
						uni.navigateTo({
							url: "/pages/checkcode-result/checkcode-result"
						})
					}
				})
			},
			tagClick(index){
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.guard-only{
		height: 100%;
		.check-code{
			box-sizing: border-box;
			height: 60rpx;
			display: flex;
			align-items: center;
			box-shadow: $boxshadow;
			padding: 4rpx 20rpx;
			.iconfont{
				font-size: 40rpx;
				margin-right: 20rpx;
			}
			.notice{
				color: #aaa;
				font-size: 24rpx;
			}
		}
		.van-notice-bar{
			height: 80rpx;
		}
		.swiper{
			width: 100%;
			height: 300rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.head{
			font-size: 28rpx;
			padding: 20rpx;
		}
		.tags{
			display: flex;
			align-items: center;
			justify-content: space-around;
			font-size: 28rpx;
			color: #333;
			height: 100rpx;
			line-height: 100rpx;
			box-shadow: $boxshadow;
			box-sizing: border-box;
			padding: 4rpx 0;
			.tag{
				box-sizing: border-box;
			}
			.tag-active{
				border-bottom: 2rpx solid $bgcolor;
			}
		}
	}
</style>
