<!-- 企业注册 -->
<template>
	<view class="company-register">
		<view class="content">
			<view 
				class="register-item" 
				v-for="(item,index) in registerItem" 
				:key="index"
				@click="itemChecked(index)" 
				:class="currentIndex == index ? 'checked' : ''"
			>
				<view class="top">{{item.type}}</view>
				<view class="bottom">
					<view class="info">
						<text style="margin-right: 20rpx;">{{item.info}}</text>
						<text>{{item.isCheckFace}}</text>
					</view>
					<view class="price">{{item.price}}</view>
				</view>
			</view>
		</view>
		<view class="next">
			<button type="primary" @click="toWriteInfo">已选好，下一步</button>
		</view>
		<view class="desc">
			<itemDesc />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0, // 记录当前选中的索引值
				registerItem: [{
						type: '公司版',
						info: '1门岗',
						isCheckFace: '可选认证对比',
						price: '2999元'
					},
					{
						type: '公司版',
						info: '1门岗',
						isCheckFace: '可选认证对比',
						price: '2999元'
					},
					{
						type: '公司版',
						info: '1门岗',
						isCheckFace: '可选认证对比',
						price: '2999元'
					},
					{
						type: '公司版',
						info: '1门岗',
						isCheckFace: '可选认证对比',
						price: '2999元'
					},
					{
						type: '公司版',
						info: '1门岗',
						isCheckFace: '可选认证对比',
						price: '2999元'
					},
				], // 注册选项
			}
		},
		methods: {
			// 点击下一步，跳转信息填写
			toWriteInfo() {
				uni.navigateTo({
					url: "/pages/register-info/register-info"
				})
			},
			// 点击选中
			itemChecked(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.company-register {
		height: 100vh;

		.content {
			box-sizing: border-box;
			padding: 40rpx;
			padding-bottom: 0;
			.register-item {
				box-shadow: $boxshadow;
				box-sizing: border-box;
				padding: 20rpx;
				margin-bottom: 40rpx;

				.top {
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.info {
						font-size: 28rpx;
						color: #aaa;
					}

					.price {
						color: red;
						font-size: 30rpx;
					}
				}
			}
			// 选中后item的样式
			.checked{
				background-color: #F0AD4E;
				color: #fff;
				.bottom{
					.info{
						color: #fff;
					}
				}
			}
		}
		
		.next{
			padding: 0 40rpx;
		}
	}
</style>
