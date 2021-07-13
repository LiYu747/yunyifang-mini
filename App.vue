<script>
	export default {
		globalData: {
			isAgree: true, // 是否同意注册协议
			roleType: '', // 选定的角色类型
		},
		onLaunch: function(e) {
			console.log(e);
			// 判断用户是通过个人会话分享预约进入的小程序
			if(e.path.indexOf('subscribe') !== -1 && e.scene == 1007){
				console.log('我是通过分享预约进来的');
				uni.reLaunch({
					url: "/pages/entrance/entrance"
				})
			}
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/vant/common/index.wxss";
	@import url("/static/scss/iconfont.css");
	@import url("/static/scss/base.css");
</style>
