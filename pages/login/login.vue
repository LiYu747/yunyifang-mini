<!-- 登录 -->
<template>
	<view class="app">
		<view class="logo">
			<image class="logoimg" src="../../static/logo.png" mode="aspectFit"></image>
		</view>
		<view class="usename">
			账号：<input type="text" placeholder="请输入手机号" />
		</view>
		<view class="password">
			密码：<input type="password" placeholder="请输入密码" />
		</view>
		<navigator url="/pages/profile/profile">
			<button class="register">登录</button>			
		</navigator>
		<navigator url="../WechatRegistration/WechatRegistration">
			<button class="WeChat">个人微信登录</button>			
		</navigator>
		<view class="forget" @click="toRetrievePassword">
			忘记密码?
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
				
			}
		},
		methods: {
			// 点击忘记密码跳转找回密码页面
			toRetrievePassword() {
				uni.navigateTo({
					url: '/pages/retrieve-password/retrieve-password'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.app{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 27rpx;
}

.logoimg{
	margin: 60rpx 0;
	width: 200rpx;
	height: 200rpx;
}
input{
	border: 1px solid #eee;
	width: 400rpx;
	height: 60rpx;
	padding-left:10px ;
}
.usename{
	display: flex;
	align-items: center;
}
.password{
	display: flex;
	margin: 20px 0 25px 0;
	align-items: center;
}
.uni-list-cell{
	display: flex;
	align-items: center;
}
/* /deep/switch{
	color: #4CD964;
} */
button{
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 30rpx;
	color:  #FFFFFF;
	border:none;
}
.register{
	background-color: rgb(178,192,200);
	margin-top: 25px;
}
.WeChat{
	background-color: rgb(26,173,25);
	margin-top: 20px;
}
.forget{
	margin: 18px 0;
	color: $bgcolor;
}
</style>
