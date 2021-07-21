<!-- 我的拜访详情与被我的访客详情信息 -->
<template>
	<view v-if="wxvisitDetail" class="visitor-detail">
		<!-- 被访问人信息 -->
		<view class="interviewee">
			<view class="flex">
				<image class="left" src="../../static/img/logo.png" mode="aspectFit" />
				<view class="right">
					<view class="flex">
						<view class="title">
							姓名
						</view>
						{{wxvisitDetail.name}}
					</view>
					<!-- <view>被访人部门：{{wxvisitDetail}}</view> -->
					<view class="flex">
						<view class="title">
							性别
						</view>
						{{wxvisitDetail.gender == 1 ? '男' : '女'}}
					</view>
					<view class="flex">
						<view class="title">
							审批时间
						</view>
						{{wxvisitDetail.visitTime}}
					</view>
				</view>
			</view>
			<view class="button" v-if="wxvisitDetail.intervieweeStatus == 1 && type == 1">
				<button class="btn" @click="agree" type="primary">同意</button>
				<button class="btn" @click="refuse" type="warn">拒绝</button>
			</view>
		</view>
		<!-- 来访者信息 -->
		<view class="visitor">
			<view class="title">详细信息</view>
			<view class="row">
				<text class="column1">所在单位</text>
				<text class="column2">{{wxvisitDetail.companyName}}</text>
			</view>
			<view class="row sex">
				<text class="column1">岗位</text>
				<text class="column2">{{wxvisitDetail.companyJob}}</text>
			</view>
			<view class="row">
				<text class="column1">来访车牌</text>
				<text class="column2">{{wxvisitDetail.carNo}}</text>
			</view>
			<view class="row">
				<text class="column1">闸机识别</text>
				<text class="column2">{{wxvisitDetail.companyJob}}</text>
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
				<text class="column1">二维码</text>
				<image class="pic" :src="'data:image/png;base64,'+ wxvisitDetail.base64QrCode" mode="aspectFit" />
			</view>
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
			this.type = options.type
			this.getWxvisitDetail(options.id)
		},
		methods: {
			//获取用户资料
			async getWxvisitDetail(id) {
				const res = await this.$api.wxvisitDetail(id);
				const data = res.data;
				data.intervieweeStartTime = data.intervieweeStartTime.slice(0, 16)
				data.intervieweeEndTime = data.intervieweeEndTime.slice(11, 16)
				data.visitTime = data.intervieweeStartTime + ' - ' + data.intervieweeEndTime
				this.wxvisitDetail = data;
				console.log(this.wxvisitDetail, "---")
			},
			// 同意
			agree() {
				this.option(2)
			},
			// 拒绝
			refuse() {
				this.option(3)
			},
			//操作请求
			async option(status) {
				const res = await this.$api.operation(this.wxvisitDetail.id, {
					intervieweeStatus: status,
					id: this.wxvisitDetail.id
				});
				if(res.statusCode === 200){
					uni.showToast({
						icon:"none",
						title:"操作成功"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.visitor-detail {
		box-sizing: border-box;
		padding: 30rpx;

		// 被访问者信息
		.interviewee {
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 40rpx 20rpx;
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
			margin-bottom: 20rpx;

			.left {
				width: 150rpx;
				height: 150rpx;
			}

			.right {
				box-sizing: border-box;
				padding-left: 20rpx;
				color: #333333;
				font-size: 28rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.title {
					width: 130rpx;
				}
			}
		}

		// 来访者信息
		.visitor {
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
			padding: 40rpx 20rpx;
			border-radius: 10rpx;
			margin-bottom: 40rpx;

			.title {
				color: #000000;
				font-size: 36rpx;
				font-weight: bold;
			}

			.row {
				margin-top: 30rpx;
				display: flex;
				color: #808080;
				font-size: 28rpx;
				box-sizing: border-box;
				align-items: center;

				.column1 {
					display: block;
					width: 150rpx;
				}

				.column2 {
					color: #333333;
				}

				.pic {
					width: 300rpx;
					height: 200rpx;
				}
			}
		}

		.button {
			margin-top: 10rpx;
			width: 100%;
			display: flex;
			justify-content: space-around;
			padding: 20rpx 0;

			.btn {
				width: 250rpx;
				height: 70rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>
