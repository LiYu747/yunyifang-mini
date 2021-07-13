<!-- 预约审核 -->
<template>
	<view class="audit">
		<view class="visitor">
			<view class="title">来访者信息</view>
			<view class="row">
				<text class="column1">姓名</text>
				<text class="column2">马化腾</text>
			</view>
			<view class="row sex">
				<text class="column1">性别</text>
				<text class="column2">男</text>
			</view>
			<view class="row">
				<text class="column1">照片</text>
				<image class="pic" src="../../static/logo.png" mode="aspectFit" />
			</view>
			<view class="row">
				<text class="column1">预约时间</text>
				<text class="column2">2021-5-18 10:00-12:00</text>
			</view>
			<view class="row">
				<text class="column1">岗位</text>
				<text class="column2">董事长</text>
			</view>
			<view class="row">
				<text class="column1">来访车牌</text>
				<text class="column2">粤B00001</text>
			</view>
			<view class="row">
				<text class="column1">闸机识别</text>
				<text class="column2">已同步</text>
			</view>
			<view class="row">
				<text class="column1">随行人数</text>
				<text class="column2">3人</text>
			</view>
			<view class="row">
				<text class="column1">来访目的</text>
				<text class="column2">参观</text>
			</view>
			<view class="row">
				<text class="column1">身份证号码</text>
				<text class="column2">4564556*******113121</text>
			</view>
			<view class="row">
				<text class="column1">所在单位</text>
				<text class="column2">深圳市腾讯计算机系统有限公司</text>
			</view>
			<view class="row">
				<text class="column1">工牌</text>
				<image class="pic" src="../../static/logo.png" mode="aspectFit" />
			</view>
			<view class="row">
				<text class="column1">名片</text>
				<image class="pic" src="../../static/logo.png" mode="aspectFit" />
			</view>
			<!-- 来访者信息和被访者信息不同点 -->
			<view class="row" v-if="type === 'visitor'">
				<text class="column1">身份证</text>
				<text class="column2">仅限安保人员查看（验后即销毁），您无权查看来访者隐私信息</text>
			</view>
			<view class="row" v-else-if="type === 'interviewee'">
				<text class="column1">二维码</text>
				<image class="pic" src="../../static/logo.png" mode="aspectFit" />
			</view>
		</view>
		<view class="btn">
			<button class="agree" type="primary">同意</button>
			<button class="reject" type="warn">拒绝</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.audit{
		box-sizing: border-box;
		padding: 20rpx;
		// 来访者信息
		.visitor{
			box-shadow: $boxshadow;
			.title{
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
			.row{
				//height: 80rpx;
				display: flex;
				color: #333;
				font-size: 24rpx;
				box-sizing: border-box;
				padding: 20rpx;
				align-items: center;
				border: {
					top: 2rpx solid #eee;
					left: 2rpx solid #eee;
					right: 2rpx solid #eee;
				};
				.column1{
					display: block;
					width: 150rpx;
				}
				.pic{
					width: 300rpx;
					height: 200rpx;
				}
			}
		}
		.btn{
			margin-top: 40rpx;
			display: flex;
			justify-content: space-around;
			.agree{
				width: 30%;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
			}
			.reject{
				@extend .agree;
			}
		}
	}
</style>
