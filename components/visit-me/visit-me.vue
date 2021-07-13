<!-- 我的接待(我的到访页面) -->
<template>
	<view class="visit-me">
		<fake-search />
		<van-notice-bar scrollable text="今日您一共有2个访客，1个拜访,本周接待人数：22人,本周拜访人数：2人" />
		<scroll-view class="scroll" scroll-y>
			<view class="swiper">
				<swiper indicator-dots autoplay indicator-active-color="#1296db">
					<swiper-item>
						<image src="../../static/logo.png" mode="aspectFit"/>
					</swiper-item>
					<swiper-item>
						<image src="../../static/logo.png" mode="aspectFit"/>
					</swiper-item>
				</swiper>
			</view>
			<view class="head">
				<userGreetings />
			</view>
			<visitMsg :msg="todayMsg"  :title="title[0] || '我的今日到访'"/>
			<visitMsg :msg="historyMsg" :title="title[1] || '我的历史到访'"/>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				todayMsg: [], // 今日到访信息记录
				historyMsg: [], // 历史到访信息记录
			}
		}
	}
</script>

<style lang="scss" scoped>
	.visit-me {
		height: 100%;
	
		/deep/ .van-notice-bar {
			height: 80rpx;
		}
	
		.scroll {
			height: calc(100% - 100rpx - 80rpx);
	
			.swiper {
				width: 100%;
				height: 300rpx;
				image {
					width: 100%;
					height: 300rpx;
				}
			}
	
			.head {
				box-sizing: border-box;
				padding: 20rpx;
				font-size: 24rpx;
				color: #333;
			}
		}
	}
</style>
