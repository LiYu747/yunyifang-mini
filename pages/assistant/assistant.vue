<!-- 秘书助手页面 -->
<template>
	<view class="assistant">
		<view class="content">
			<my-visit v-show="currentIndex === 0" />
			<visit-me v-show="currentIndex === 1" :title="title"/>
			<user-info v-show="currentIndex === 2"/>
		</view>
		<tabbar :items="items" @sendIndex="sendIndex"/>
	</view>
</template>

<script>
	export default {
		name: "assistant",
		data() {
			return {
				title: ['我的今日接待','我的历史接待'], // 访问状态标题
				items: [
					{
						deactiveImg: require('../../static/img/tabbar/bf1.png'),
						activeImg: require('../../static/img/tabbar/bf2.png'),
						text: '我的拜访'
					},
					{
						deactiveImg: require('../../static/img/tabbar/jd1.png'),
						activeImg: require('../../static/img/tabbar/jd2.png'),
						text: '我的接待'
					},
					{
						deactiveImg: require('../../static/img/tabbar/profile1.png'),
						activeImg: require('../../static/img/tabbar/profile2.png'),
						text: '我的'
					}
				], // tabbar图片，标题
				currentIndex: 0, // 记录当前点击tabbar-item的index
			}
		},
		onLoad() {
			
		},
		methods: {
			sendIndex(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.assistant{
		height: 100vh;
		.content{
			height: calc(100% - 100rpx);
		}
	}
</style>
