<!-- 我的拜访 -->
<template>
	<view class="guard-index">
		<fake-search />
		<van-notice-bar scrollable text="在你拜访的客人前面还有3位，预计45分钟，请耐心等待..." />
		<scroll-view class="scroll" scroll-y>
			<view class="content">
				<view class="swiper">
					<swiper indicator-dots autoplay indicator-active-color="#1296db">
						<swiper-item>
							<image src="../../static/logo.png" mode="aspectFit" />
						</swiper-item>
						<swiper-item>
							<image src="../../static/logo.png" mode="aspectFit" />
						</swiper-item>
					</swiper>
				</view>
				<view class="head">
					<userGreetings />
				</view>
				<!-- 今日我的拜访信息 -->
				<visitMsg :msg="todayMsg"/>
				<!-- 历史我的拜访信息 -->
				<visitMsg :msg="historyMsg" title="历史拜访记录"></visitMsg>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				todayMsg: [], // 今天信息
				historyMsg: [], // 历史信息
			}
		}
	}
</script>

<style lang="scss" scoped>
	.guard-index{
		height: 100%;
		/deep/ .van-notice-bar{
			height: 80rpx;
		}
		.scroll{
			height: calc(100% - 100rpx - 80rpx);
			.swiper{
				width: 100%;
				height: 300rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.head{
				box-sizing: border-box;
				padding: 20rpx;
			}
		}
	}
</style>
