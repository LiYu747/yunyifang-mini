<!-- tabbar底部导航栏 -->
<template>
	<view class="tabbar">
		<view class="tabbar-item" v-for="(item,index) in items" :key="index" @click="itemClick(index)">
			<image 
				class="tabbar-img" 
				:src="item.deactiveImg" 
				mode="aspectFit" 
				v-show="!(index === currentIndex)"
			/>
			<image 
				class="tabbar-img" 
				:src="item.activeImg" 
				mode="aspectFit" 
				v-show="index === currentIndex"
			/>
			<view :class="index === currentIndex ? 'active' : ''">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0
			}
		},
		props: {
			items: {
				type: Array,
				default: [
					{
						deactiveImg: require('../../static/img/tabbar/bf1.png'),
						activeImg: require('../../static/img/tabbar/bf2.png'),
						text: '我的拜访'
					},
					{
						deactiveImg: require('../../static/img/tabbar/jd1.png'),
						activeImg: require('../../static/img/tabbar/jd2.png'),
						text: '我的访客'
					},
					{
						deactiveImg: require('../../static/img/tabbar/profile1.png'),
						activeImg: require('../../static/img/tabbar/profile2.png'),
						text: '我的'
					}
				]
			}
		},
		methods:{
			itemClick(index) {
				this.currentIndex = index;
				// if(index === this.items.length - 1){
				// 	uni.reLaunch({
				// 		url: "/pages/profile/profile"
				// 	})
				// }
				this.$emit('sendIndex',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar{
		width: 100%;
		box-sizing: border-box;
		box-shadow: $boxshadow;
		height: 100rpx;
		display: flex;
		align-items: center;
		.tabbar-item{
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;
			color: #333;
			.tabbar-img{
				width: 50rpx;
				height: 50rpx;
			}
			.active{
				color: $bgcolor;
			}
		}
	}
</style>
