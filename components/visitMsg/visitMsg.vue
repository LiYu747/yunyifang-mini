<!-- 来访信息组件 -->
<template>
	<view class="visit-msg">
		<view class="title">
			<text>{{title}}</text>
			<text class="iconfont icon-geren"></text>
		</view>
		<view class="content" v-if="msg.length !== 0">
			<!-- 每个来访状态 -->
			<view 
				class="msg" 
				v-for="(item,index) in msg" 
				:key="item.id" 
				:style="{color: isHistory ? '#999' : ''}"
			>
				<view class="head">
					<text class="company">{{item.company}}</text>
					<text class="time">{{item.visitTime}}</text>
					<text @click="toVisitDetail(item.auditState)" class="detail">详情</text>
				</view>
				<view class="step">
					<view>
						<text>门岗授权</text>
						<text class="iconfont icon-gou"></text>
					</view>
					<view>
						<text>秘书/助理</text>
						<text class="iconfont icon-gou"></text>
					</view>
					<view>
						<text>{{item.auditState}}</text>
						<text class="iconfont icon-gou"></text>
					</view>
					<view>{{item.visitState}}</view>
				</view>
			</view>
		</view>
		<van-empty v-else description="暂无记录哦"/>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '我的今日拜访'
			},
			// 来访信息
			msg: {
				type: Array,
				default: [
					{	
						id: '001',
						company: '深圳腾讯计算有限公司',
						boss: '马化腾',
						visitTime: '2021-5-14 10:20-11:00',
						auditState: '受访人已审核',
						visitState: '进行中'
					},
					{	
						id: '002',
						company: '万达',
						boss: '王健林',
						visitTime: '2021-5-14 10:20-11:00',
						auditState: '受访人待审核',
						visitState: '等待中'
					},
					{
						id: '003',
						company: '阿里巴巴',
						boss: '马云',
						visitTime: '2021-5-14 10:20-11:00',
						auditState: '受访人已拒绝',
						visitState: '已终止'
					}
				]
			}
		},
		computed: {
			isHistory() {
				return this.title.indexOf('历史') !== -1
			}
		},
		methods: {
			// 点击详情跳转来访详情页
			toVisitDetail(auditState) {
				let type = ''
				if(this.title == '我的今日到访' || this.title == '我的历史到访' || this.title == '我的今日接待' || this.title == '我的历史接待'){
					type = 'visitor'
				}else if(this.title == '我的今日拜访' || this.title == '历史拜访记录'){
					type = 'interviewee'
				}
				uni.navigateTo({
					url: `/pages/detail/detail?type=${type}&auditState=${auditState}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.visit-msg{
		box-sizing: border-box;
		padding: 0 20rpx;
		box-shadow: $boxshadow;
		margin-bottom: 20rpx;
		.title{
			font-size: 30rpx;
			padding: 20rpx 0;
			font-weight: bold;
			border-bottom: 2rpx solid #eee;
			.iconfont{
				color: $bgcolor;
			}
		}
		.content{
			font-size: 24rpx;
			color: #333;
			.msg{
				padding: 20rpx 0;
				border-bottom: 2rpx solid #eee;
				.head{
					display: flex;
					justify-content: space-between;
					padding-bottom: 10rpx;
					.detail{
						color: $bgcolor;
					}
				}
				.step{
					display: flex;
					justify-content: space-between;
					.iconfont{
						font-size: 20rpx;
					}
				}
			}
		}
		/deep/ .van-empty{
			height: 300rpx;
		}
	}
</style>
