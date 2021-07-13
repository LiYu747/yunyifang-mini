<!-- 我的拜访详情与被我的访客详情信息 -->
<template>
	<view class="visitor-detail">
		<!-- 被访问人信息 -->
		<view class="interviewee">
			<image class="left" src="../../static/logo.png" mode="aspectFit"/>
			<view class="right">
				<view>被访人：董事长</view>
				<view>被访人部门：董事长办公室</view>
				<view>被访人审批：已通过</view>
				<view>审批时间：2021-5-18 13:00</view>
			</view>
		</view>
		<!-- 来访者信息 -->
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
		<view class="button" v-if="type === 'visitor' && auditState === '受访人待审核'">
			<button class="btn" size="mini" type="primary">同意</button>
			<button class="btn" size="mini" type="warn">拒绝</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '', // 点击详情传过来的类型，判断是来访者详情还是被访者详情
				auditState: '', // 点击详情传过来的审核状态,判断是否显示同意，拒绝按钮
			}
		},
		onLoad(options) {
			console.log(options);
			this.type = options.type
			this.auditState = options.auditState
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.visitor-detail{
		box-sizing: border-box;
		padding: 20rpx;
		// 被访问者信息
		.interviewee{
			box-sizing: border-box;
			padding: 20rpx;
			box-shadow: $boxshadow;
			display: flex;
			margin-bottom: 20rpx;
			.left{
				width: 100rpx;
				height: 150rpx;
			}
			.right{
				box-sizing: border-box;
				padding-left: 20rpx;
				color: #333;
				font-size: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}
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
		.button{
			width: 100%;
			display: flex;
			justify-content: space-around;
			padding: 20rpx 0;
			.btn{
				display: block;
			}
		}
	}
</style>

