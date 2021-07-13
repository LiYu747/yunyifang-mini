<template>
	<view class="guard">
		<view class="content">
			<my-visit v-show="currentIndex === 0"></my-visit>
			<visit-me v-show="currentIndex === 1"></visit-me>
			<guard-only v-show="currentIndex === 2"></guard-only>
			<user-info v-show="currentIndex === 3"></user-info>
		</view>
		<tabbar :items="items" @sendIndex="sendIndex"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [
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
						deactiveImg: require('../../static/img/tabbar/mw1.png'),
						activeImg: require('../../static/img/tabbar/mw2.png'),
						text: '门岗守卫'
					},
					{
						deactiveImg: require('../../static/img/tabbar/profile1.png'),
						activeImg: require('../../static/img/tabbar/profile2.png'),
						text: '我的'
					}
				],
				currentIndex: 0
			}
		},
		methods: {
			// 保存tabbar自定义事件传过来的index,便于知道点击tabbar-item显示对应组件
			sendIndex(index){
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.guard{
		height: 100vh;
		.content{
			height: calc(100% - 100rpx);
		}
	}
</style>
