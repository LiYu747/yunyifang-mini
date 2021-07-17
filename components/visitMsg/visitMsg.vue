<!-- 来访信息组件 -->
<template>
	<view class="visit-msg">
		<view class="title" style="border-radius: 6px;" 
		:style="type==1 ? 'background-color: #80808036;' : 'background-color: #03bff75c;'">
			<text>{{title}}</text>
			<img style="width:16px;height:16px;"
				:src="type == 1 ? '../../static/img/todayVisit.png' : '../../static/img/historyVisit.png'" alt="">
		</view>
		<view class="content" v-if="msg.length !== 0">
			<!-- 每个来访状态 -->
			<view class="msg" v-for="(item,index) in msg" :key="item.id" :style="{color: isHistory ? '#999' : ''}">
				<view class="head" wx:if="index==0">
					<text class="company">{{type==1 ? '待访公司' : '来访公司'}}</text>
					<text class="time">创建日期</text>
					<text class="detail" style="color:black">操作</text>
				</view>
				<view class="head">
					<text class="company">{{item.companyName}}</text>
					<text class="time">{{item.crtTime}}</text>
					<text @click="toVisitDetail(item.id)" class="detail">详情</text>
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
		onLoad() {
		},
		onShow(){
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
			toVisitDetail(id) {
				// let type = ''
				// if(this.title == '我的今日到访' || this.title == '我的历史到访' || this.title == '我的今日接待' || this.title == '我的历史接待'){
				// 	type = 'visitor'
				// }else if(this.title == '我的今日拜访' || this.title == '历史拜访记录'){
				// 	type = 'interviewee'
				// }
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.visit-msg {
		box-sizing: border-box;
		padding: 0 20rpx;
		box-shadow: $boxshadow;
		margin-bottom: 20rpx;

		.title {
			font-size: 30rpx;
			padding: 20rpx 0;
			font-weight: bold;
			border-bottom: 2rpx solid #eee;
			display: flex;
			align-items: center;

			.iconfont {
				color: $bgcolor;
			}

			img {
				margin-left: 10rpx;
			}
		}

		.content {
			font-size: 24rpx;
			color: #333;

			.msg {
				padding: 20rpx 0;
				border-bottom: 2rpx solid #eee;

				.head {
					display: flex;
					justify-content: space-between;
					padding-bottom: 10rpx;

					.detail {
						color: $bgcolor;
					}
				}

				.step {
					display: flex;
					justify-content: space-between;

					.iconfont {
						font-size: 20rpx;
					}
				}
			}
		}

		/deep/ .van-empty {
			height: 300rpx;
		}
	}
</style>
