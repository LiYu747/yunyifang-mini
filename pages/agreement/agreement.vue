<!-- 注册协议 -->
<template>
	<view class="agreement">
		<view class="title">注册协议</view>
		<!-- 协议内容 -->
		<scroll-view>
			<view class="content">
				456465
			</view>
		</scroll-view>
		<!-- 点击选择按钮是否同意协议 -->
		<view class="agree">
			<label @click="agree" :class="isAgree?'':'noagree'">
				<radio :checked="isAgree" style="transform: scale(0.7);"></radio>
				同意注册协议
			</label>
		</view>
		<view class="to-register">
			<button :disabled="!isAgree" @click="toRegister" :class="isAgree ? 'iagree' : ''">继续注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAgree: false
			}
		},
		onLoad() {
			this.isAgree = getApp().globalData.isAgree
		},
		methods: {
			// 点击是否同意注册协议
			agree() {
				getApp().globalData.isAgree = !getApp().globalData.isAgree
				this.isAgree = getApp().globalData.isAgree
			},
			// 点击继续注册返回注册页面
			toRegister() {
				uni.navigateTo({
					url: `/pages/entrance/entrance`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.agreement{
		.title{
			text-align: center;
			font-size: 40rpx;
			font-weight: bold;
			padding: 40rpx 0;
		}
		scroll-view{
			margin: auto;
			width: 500rpx;
			height: 800rpx;
			border: 1px solid #000;
			.content{
				box-sizing: border-box;
				padding: 20rpx;
			}
		}
		.agree{
			text-align: center;
			margin: 20rpx 0;
			font-size: 28rpx;
			.noagree{
				color: #aaa;
			}
		}
		.to-register{
			button{
				width: 500rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 30rpx;
			}
			.iagree{
				color: #fff;
				background-color: $comcolor;
			}
		}
	}
</style>
