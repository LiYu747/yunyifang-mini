<template>
	<view class="user-greetings">
		<view class="username">李云龙先生您好！</view>
		<view class="time-weather">
			<view class="time">今天是{{today}}日</view>
			<view class="weather">
				<text>天气：晴</text>
				<text>温度：18-24摄氏度</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				today: '', // 今天日期
			}
		},
		created() {
			this.getToday()
		},
		methods: {
			// 获取今天日期
			getToday() {
				const date = new Date()
				this.today = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-greetings{
		margin-bottom: 20rpx;
		text-align: center;
		font-size: 24rpx;
		color: #333;
		.username{
			margin-bottom: 20rpx;
		}
		.time-weather{
			display: flex;
			justify-content: space-between;
		}
		.weather{
			& text:nth-child(1){
				margin-right: 30rpx;
			}
		}
	}
</style>
