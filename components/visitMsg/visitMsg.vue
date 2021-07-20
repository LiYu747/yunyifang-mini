<!-- 来访信息组件 -->
<template>
	<view class="visit-msg m-t2">
		<view class="title">
			<text>{{title}}</text>
		</view>
		<view class="content" v-if="msg.length !== 0">
			<!-- 每个来访状态 -->
			<view class="msg" v-for="(item,index) in msg" @click="toVisitDetail(item)" :key="item.id"
				:style="{color: isHistory ? '#999' : ''}">
				<view class="itemNane">
					<view class="">
						{{item.name}}
					</view>
					<view 
						:class="[item.intervieweeStatus=='待审核'?'nopas':'',item.intervieweeStatus=='已通过'?'pass':'',item.intervieweeStatus == '未通过'?'termination':'']">
						{{item.intervieweeStatus}}
					</view>
				</view>
				<view class="itemCent">
					<view class="m-t3 flex al-center">
						事业单位:
						<view class="company">
							{{item.companyName}}
						</view>
					</view>
					<view class="m-t3 flex al-center">
						来访日期:
						<view class="company">
							{{item.visitTime}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<van-empty v-else description="暂无记录哦" />
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '我的今日拜访'
			},
			type: null,
			// 来访信息
			msg: {
				type: Array,
				default: [{
					id: '001',
					company: '深圳腾讯计算有限公司',
					boss: '马化腾',
					visitTime: '2021-5-14 10:20-11:00',
					auditState: '受访人已审核',
					visitState: '进行中'
				}]
			}
		},
		onLoad() {},
		onShow() {
			console.log("创建")
		},
		computed: {
			isHistory() {
				return this.title.indexOf('历史') !== -1
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
		methods: {
			// 点击详情跳转来访详情页
			toVisitDetail(item) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + item.id + "&type=" + this.type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.visit-msg {
		width: 690rpx;
		padding: 40rpx 30rpx;
		background: #FFF;

		.title {
			font-size: 36rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #000000;
			margin-bottom: 20rpx;
		}

		.content {
			font-size: 24rpx;
			color: #333;

			.msg {
				margin-top: 20rpx;
				width: 100%;
				border-radius: 10rpx;
				box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
				display: flex;
				flex-direction: column;
				align-items: center;

				.itemNane {
					width: 650rpx;
					height: 90rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32rpx;
					border-bottom: 1px solid #F2F2F2;
					font-weight: bold;
					color: #000000;

					.nopas {
						color: #FFB109;
						font-size: 28rpx;
						font-weight: 400;
					}

					.pass {
						color: #349A20;
						font-size: 28rpx;
						font-weight: 400;
					}
				}

				.itemCent {
					width: 650rpx;
					font-size: 28rpx;
					color: #333;
					margin-bottom: 40rpx;

					.company {
						margin-left: 10rpx;
						color: #808080;
					}
				}

				.jurmsg {
					border-top: 1px solid #F2F2F2;
					width: 690rpx;
					height: 90rpx;
					;
					color: #349A20;
					font-size: 28rpx;

					.jurflex {
						flex: 1;
						height: 90rpx;
					}

					.boder-r {
						border-right: 1px solid #F2F2F2;
					}

					.yesIcon {
						width: 50rpx;
						height: 50rpx;
						;
					}
				}

				.refuse {
					color: #FF0000;
				}

				.refuseIcon {
					width: 32rpx;
					height: 32rpx;
					margin-left: 10rpx;
				}

				.termination {
					color: #FF0000;
					font-size: 28rpx;
					font-weight: 400;
				}

			}
		}


	}
</style>
