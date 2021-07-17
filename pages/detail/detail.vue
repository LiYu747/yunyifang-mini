<!-- 我的拜访详情与被我的访客详情信息 -->
<template>
	<view class="visitor-detail">
		<!-- 被访问人信息 -->
		<view class="interviewee">
			<image class="left" src="../../static/logo.png" mode="aspectFit" />
			<view class="right">
				<view>被访人：{{wxvisitDetail.intervieweeName}}</view>
				<!-- <view>被访人部门：{{wxvisitDetail}}</view> -->
				<view>被访人审批：{{wxvisitDetail.intervieweeStatus==1 ? '未通过' : '已通过'}}</view>
				<view>审批时间：{{wxvisitDetail.updTime}}</view>
			</view>
		</view>
		<!-- 来访者信息 -->
		<view class="visitor">
			<view class="title">来访者信息</view>
			<view class="row">
				<text class="column1">姓名</text>
				<text class="column2">{{wxvisitDetail.name}}</text>
			</view>
			<view class="row sex">
				<text class="column1">性别</text>
				<text class="column2">{{wxvisitDetail.gender == 1 ? '男' :"女"}}</text>
			</view>
			<view class="row">
				<text class="column1">预约时间</text>
				<text class="column2">{{wxvisitDetail.intervieweeStartTime}}</text>
			</view>
			<view class="row">
				<text class="column1">岗位</text>
				<text class="column2">{{wxvisitDetail.companyJob}}</text>
			</view>
			<view class="row">
				<text class="column1">来访车牌</text>
				<text class="column2">{{wxvisitDetail.carNo}}</text>
			</view>
			<view class="row">
				<text class="column1">随行人数</text>
				<text class="column2">{{wxvisitDetail.followAmount}}人</text>
			</view>
			<view class="row">
				<text class="column1">来访目的</text>
				<text class="column2">{{getType(wxvisitDetail.reasonType)}}</text>
			</view>
			<view class="row">
				<text class="column1">证件类型</text>
				<text class="column2">{{getIdCardType(wxvisitDetail.idCardType)}}</text>
			</view>
			<view class="row">
				<text class="column1">证件号码</text>
				<text class="column2">{{wxvisitDetail.idCardNo}}</text>
			</view>
			<view class="row">
				<text class="column1">所在单位</text>
				<text class="column2">{{wxvisitDetail.companyName}}</text>
			</view>
			<view class="row">
				<text class="column1">二维码</text>
				<image class="pic" :src="'data:image/png;base64,'+wxvisitDetail.base64QrCode" mode="aspectFit" />
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
				wxvisitDetail: null
			}
		},
		computed: {
			getIdCardType() {
				return (type) => {
					// 1-身份证，2-护照，3-驾驶证
					let str = '';
					if (type == 1) {
						return '身份证'
					} else if (type == 2) {
						return '护照'
					} else if (type == 3) {
						return '驾驶证'
					}
				}
			},
			getType() {
				return (type) => {
					let str = ''
					if (type == 1) {
						str = '探亲'
					} else if (type == 2) {
						str = '拜访'
					}
					return str;
				}
			}
		},
		onLoad(options) {
			console.log(options);
			this.getWxvisitDetail(options.id)
			this.type = options.type
			this.auditState = options.auditState
		},
		methods: {
			getWxvisitDetail(id) {
				console.log("-----")
				this.$api.wxvisitDetail(id).then(res => {
					this.wxvisitDetail = res
					console.log(this.wxvisitDetail, "---")
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.visitor-detail {
		box-sizing: border-box;
		padding: 20rpx;

		// 被访问者信息
		.interviewee {
			box-sizing: border-box;
			padding: 20rpx;
			box-shadow: $boxshadow;
			display: flex;
			margin-bottom: 20rpx;

			.left {
				width: 100rpx;
				height: 150rpx;
			}

			.right {
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
		.visitor {
			box-shadow: $boxshadow;

			.title {
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				font-weight: bold;
			}

			.row {
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
				}

				;

				.column1 {
					display: block;
					width: 150rpx;
				}

				.pic {
					width: 300rpx;
					height: 200rpx;
				}
			}
		}

		.button {
			width: 100%;
			display: flex;
			justify-content: space-around;
			padding: 20rpx 0;

			.btn {
				display: block;
			}
		}
	}
</style>
