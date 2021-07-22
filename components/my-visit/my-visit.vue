<!-- 主页 -->
<template>
	<view class="pages">
		<view class="swiper">
			<swiper class="" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<image :src="require('../../image/lunbotu.png')" class="itemImg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice" v-if="arr.userInfo.nickName">
			{{arr.userInfo.nickName}}：您好，今天是{{arr.dater}}
		</view>
		<view class="Statistics">
			<view class="visitorNum">
				<view class="fz-30">
					{{arr.myVisit.length}}
				</view>
				<view class="fz-14">
					今日访客
				</view>
			</view>
			<view class="ReceptionNum">
				<view class="fz-30">
					{{arr.myVisited.length}}
				</view>
				<view class="fz-14">
					今日拜访
				</view>
			</view>
			<view class="visitNum">
				<view class="fz-30">
					{{num}}
				</view>
				<view class="fz-14">
					今日总数
				</view>
			</view>
		</view>
		<visitMsg title="我的今日访客" :msg="arr.myVisited" type=1></visitMsg>
		<visitMsg title="我的今日拜访" :msg="arr.myVisit" type=2></visitMsg>
		<view class="slogan flex flex-d al-center">
			<view class="">
				cev.liephipps.com
			</view>
			<view class="m-t1 m-b1">
				云易访©四川利菲普斯科技有限公司
			</view>
			<view class="">
				©2021-2030 By Sichuan liephipps Technologies Co.，Ltd 
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
			},
			currentIndex: 0,
			
		},
		methods: {
			

		},
		computed: {
			num() {
				 return this.arr.myVisit.length + this.arr.myVisited.length
			},
			getType() {
				return (type) => {
					let str = ''
					if (type == 1) {
						str = '探親'
					} else if (type == 2) {
						str = '拜訪'
					}
					return str;
				}
			}
		},
		onShow() {
			
		},
		onReady() {
		

		},
	}
</script>

<style lang="scss" scoped>
	.fz-30 {
		font-size: 60rpx;
	}

	.fz-14 {
		font-size: 24rpx;
	}

	.pages { 
		background: #F5F5F5;
		
	}
	.swiper {
			width: 100%;
	}

 	.itemImg {
		width: 100%;
		height: 300rpx;
	}

	.notice {
		width: 720rpx;
		height: 60rpx;
		font-size: 24rpx;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
		padding-left: 30rpx;
		display: flex;
		align-items: center;
	}

	.Statistics {
		width: 690rpx;
		padding: 40rpx 30rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;

		.visitorNum {
			width: 190rpx;
			height: 150rpx;
			background: linear-gradient(#FFCEA7, #FCAA87);
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
		}

		.ReceptionNum {
			width: 190rpx;
			height: 150rpx;
			background: linear-gradient(#D0D7EE, #9EA6E9);
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
		}

		.visitNum {
			width: 190rpx;
			height: 150rpx;
			background: linear-gradient(#FFF8A9, #FFC15B);
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #fff;
		}
	}

	.slogan {
		padding: 30rpx 0;
		font-size: 24rpx;
		color: #333;
	}
</style>
