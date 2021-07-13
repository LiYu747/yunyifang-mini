<!-- 我的页面 -->
<template>
	<scroll-view scroll-y="true" style="height: 100%;">
		<view class="profile">
			<view class="content">
				<!-- 修改姓名 -->
				<view class="row">
					<text class="title">姓名</text>
					<input type="text" placeholder="请输入姓名" v-model="name">
				</view>
				<!-- 上传照片 -->
				<view class="row">
					<text class="title">照片</text>
					<image 
						:src="photoUrl" 
						v-if="photoUrl" 
						mode="aspectFit" 
						@click="previewImg(photoUrl)"
						style="width: 150rpx;height: 150rpx;margin-right: 10rpx;"></image>
					<view class="uploadimg" @click="upLoadPhoto('photo')">
						<text class="iconfont icon-shangchuantupian"></text>
					</view>
				</view>
				<!-- 手机号输入 -->
				<view class="row">
					<text class="title">手机号</text>
					<input type="number" :maxlength="11" placeholder="请输入手机号" v-model="phoneNumber">
				</view>
				<!-- 身份证号码 -->
				<view class="row">
					<text class="title">身份证号码</text>
					<input 
						type="text" 
						placeholder="请输入身份证号码" 
						v-model="idCardNumber" 
						:maxlength="18"
						@blur="chooseSexByIdCard"
						>
				</view>
				<!-- 认证对比 -->
				<view class="row">
					<text class="title">认证对比</text>
					<view class="test">
						<text class="nopass" style="color: #dd524d;">未通过</text>
						<text @click="toCheckFace" style="color: #1296DB;">开始人证对比</text>
					</view>
				</view>
				<!-- 性别 -->
				<view class="row">
					<text class="title">性别</text>
					<view class="sex">
						<view class="sex-type">
							<text>男</text>
							<text :class="manChecked?'radio checked' : 'radio'"></text>
						</view>
						<view class="sex-type">
							<text>女</text>
							<text :class="!manChecked?'radio checked' : 'radio'"></text>
						</view>
					</view>
				</view>
				<!-- 系统角色 -->
				<view class="row">
					<text class="title">系统角色</text>
					<picker 
						mode="selector" 
						:value="roleIndex"
						:range="roles" 
						:style="{color: roleIndex == 0 ? '#aaa': '#333'}"
						@change="changeIndex"
					 >
						<view>{{role}}</view>
					</picker>
				</view>
				<!-- 我的单位 -->
				<view class="row">
					<text class="title">我的单位</text>
					<input type="text" placeholder="请输入单位" v-model="company">
				</view>
				<!-- 我的岗位 -->
				<view class="row">
					<text class="title">我的岗位</text>
					<input type="text" placeholder="请输入岗位" v-model="job">
				</view>
				<!-- 我的车牌 -->
				<view class="row">
					<text class="title">我的车牌</text>
					<view class="car-number">
						<view class="province" @click="changeShowProvince">{{province}}</view>
						<text class="iconfont icon-dian"></text>
						<vcode-input
							:sum="7"
							borderColor="#eee"
							borderValueColor="#eee"
							borderActiveColor="#1296db"
							@getInputValue="vcodeInput"
							:autofocus="false"
						/>
					</view>
				</view> 
				<!-- 所有省份信息 -->
				<van-popup 
				:show="showProvince" 
				position="bottom"
				round
				@close="hiddenProvince"
				>
					<view class="province-head">
						<text class="cancel" @click="hiddenProvince">取消</text>
						<text class="title">省份</text>
						<text class="sure" @click="sureProvince">确认</text>
					</view>
					<view class="province-content">
						<view :class="currentProvince == index ? 'name checked' : 'name'"
						 v-for="(item,index) in provinceArr" :key="index" 
						 @click="provinceCheck(index)">{{item}}</view>
					</view>
				</van-popup>
				<!-- 我的工牌 -->
				<view class="row" style="position: relative;padding-top: 40rpx;">
					<text style="position: absolute;top: 6rpx;right: 20rpx; z-index: 2;font-size: 20rpx;">仅限受访人可见</text>
					<text class="title">我的工牌</text>
					<image
						:src="workCardUrl" 
						v-if="workCardUrl" 
						mode="aspectFit" 
						@click="previewImg(workCardUrl)"
						style="width: 150rpx;height: 150rpx;margin-right: 10rpx;"></image>
					<view class="uploadimg" @click="upLoadPhoto('workCard')">
						<view class="iconfont icon-shangchuantupian"></view>
					</view>
				</view>
				<!-- 我的身份证 -->
				<view class="row" style="position: relative;padding-top: 40rpx;">
					<text style="position: absolute;top: 6rpx;right: 20rpx; z-index: 2;font-size: 20rpx;">仅限安保人员核验时可见,验后自焚</text>
					<text class="title">我的身份证</text>
					<image
						:src="item" 
						v-if="idCardUrl.length !== 0" 
						mode="aspectFit" 
						@click="previewImg(idCardUrl,index)"
						v-for="(item,index) in idCardUrl"
						:key="index"
						style="width: 150rpx;height: 150rpx;margin-right: 10rpx;"></image>
					<view class="uploadimg" @click="upLoadPhoto('idCard')">
						<view class="iconfont icon-shangchuantupian">
						</view>
					</view>
				</view>
			</view>
			<!-- 保存按钮,开始云访按钮 -->
			<view class="btn">
				<button type="primary" size="mini" @click="saveInfo">保存信息</button>
				<button type="primary" size="mini" @click="beginVisit">开始云访</button>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',// 姓名
				phoneNumber: '', // 手机号
				idCardNumber: '', // 身份证号
				sex: '男', // 性别
				manChecked: true, // 性别选中标志
				company: '', // 公司
				job: '', // 岗位
				role: '请选择你的角色', // 系统角色
				roles: ['请选择你的角色','助理','门岗安保','普通用户'], // 系统角色组
				roleIndex: 0, // 系统角色索引
				province: '', // 省份
				provinceArr: [], // 所有省份信息
				currentProvince: 0,
				showProvince: false, // 展示省份组件开关
				onlyNum: '', // 车牌号数字部分
				photoUrl: '', // 上传照片预览路径
				workCardUrl: '', // 上传工牌图片预览路径
				idCardUrl: [], // 上传身份证图片预览路径
			}
		},
		created() {
			// 各个省份简写
			let provinceArr = "京津黑吉辽冀豫鲁晋陕内宁甘新青藏鄂皖苏沪浙闵湘赣川渝黔云粤桂琼港澳台";
			this.provinceArr = [...provinceArr]
			this.province = this.provinceArr[this.currentProvince]
		},
		computed: {
			// 车牌号:
			carNumber() {
				return this.province + this.onlyNum
			},
		},
		methods: {
			// 获取输入的车牌号
			vcodeInput(res) {
				this.onlyNum = res
				console.log(res);
			},
			// 点击选怎图片上传
			upLoadPhoto(type) {
				const that = this
				uni.chooseImage({
					count: type == 'photo' || type == 'workCard' ? 1 : 2,
					success(res) {
						console.log(res.tempFilePaths[0])
						const imgUrl = res.tempFilePaths
						switch(type){
							case 'photo':
							that.photoUrl = imgUrl[0]
							break
							case 'workCard': 
							that.workCardUrl = imgUrl[0]
							break
							case 'idCard':
							that.idCardUrl = imgUrl
							break
						}
					}
				})
			},
		
			// 身份证输入框失焦后根据身份证号码判定性别
			chooseSexByIdCard() {
				// 身份证正则验证
				const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(!idCardReg.test(this.idCardNumber)){
					uni.showToast({
						icon: 'none',
						title: '身份证号码格式不正确!'
					})
					return
				}
				this.manChecked = this.idCardNumber[16]%2 == 0 ? false : true
				this.sex = this.manChecked ? '男' : '女'
			},
			// 系统角色改变
			changeIndex(e){
				this.roleIndex = e.target.value
				this.role = this.roles[this.roleIndex]
			},
			// 省份改变
			provinceCheck(index){
				this.currentProvince = index
				// this.province = this.provinceArr[this.currentProvince]
			},
			// 点击确认按钮，确认选中省份
			sureProvince() {
				this.province = this.provinceArr[this.currentProvince]
				this.showProvince = false
			},
			// 点击省份展示省份组件
			changeShowProvince() {
				this.showProvince = true
			},
			// 点击隐藏省份组件
			hiddenProvince() {
				this.showProvince = false
			},
			// 点击开始云访跳转预约拜访页面
			beginVisit() {
				if(this.role === '助理'){
					getApp().globalData.roleType = 'assistant'
				}else if(this.role === '门岗安保'){
					getApp().globalData.roleType = 'guard'
				}else if(this.role === '普通用户'){
					getApp().globalData.roleType = 'commonUser'
				}else{
					return
				}
				uni.navigateTo({
					url: `/pages/subscribe/subscribe`
				})
			},
			// 点击开始认证对比，跳转人脸识别验证
			toCheckFace() {
				uni.navigateTo({
					url: "/pages/check-face/check-face"
				})
			},
			// 点击预览图片
			previewImg(imgUrl,index) {
				uni.previewImage({
					current: index || 0,
					urls: Array.isArray(imgUrl) ? imgUrl : [imgUrl],
					indicator: 'default',
					loop: true
				})
			},
			// 点击保存信息验证表单，提交表单
			saveInfo() {
				// 电话号码验证正则
				const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				// 身份证正则验证
				const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(!phoneReg.test(this.phoneNumber) || !idCardReg.test(idCardNumber)) {
					uni.showToast({
						icon: 'none',
						title: '手机号或者身份证号码格式不正确！',
						duration: 2000
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.profile{
		width: 100%;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #333;
		.content{
			box-sizing: border-box;
			box-shadow: $boxshadow;
			.row{
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 20rpx;
				border: {
					top: 2rpx solid #eee;
					left: 2rpx solid #eee;
					right: 2rpx solid #eee;
				};
				// 每一行标题
				.title{
					display: block;
					width: 20%;
					font-weight: bold;
				}
				/deep/ .input-placeholder{
					color: #aaa;
				}
				// 上传图片
				.uploadimg{
					position: relative;
					width: 150rpx;
					height: 150rpx;
					background-color: #eee;
					display: flex;
					align-items: center;
					justify-content: center;
					.iconfont{
						font-size: 50rpx;
						color: #fff;
						.notice{
							width: 100%;
							position: absolute;
							top: 0rpx;
							left: 0;
							font-size: 24rpx;
							color: #333;
						}
					}
				}
				// 人证对比
				.test{
					color: #333;
					.nopass{
						margin-right: 20rpx;
					}
				}
				// 性别
				.sex{
					display: flex;
					.sex-type{
						display: flex;
						align-items: center;
						margin-right: 20rpx;
						.radio{
							display: block;
							margin-left: 5rpx;
							width: 20rpx;
							height: 20rpx;
							border: 2rpx solid #aaa;
							border-radius: 50%;
						}
						.checked{
							border: 2rpx solid $comcolor;
							background-color: $comcolor;
						}
					}
				}
				// 车牌
				.car-number{
					display: flex;
					align-items: center;
					.province{
						width: 50rpx;
						height: 50rpx;
						border: 2rpx solid #eee;
						text-align: center;
						line-height: 50rpx;
					}
				}
			}
			// 省份组件样式
			.province-head{
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 10rpx;
				font-size: 28rpx;
				.cancel{
					color: #aaa;
				}
				.sure{
					color: $comcolor;
				}
			}
			.province-content{
				padding: 20rpx 0;
				display: flex;
				flex-wrap: wrap;
				.name{
					width: 50rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					border: 2rpx solid #eee;
					margin: 10rpx;
				}
				// 当前被选中省份样式
				.checked{
					color: #fff;
					background-color: $comcolor;
				}
			}
		}
		.btn{
			box-sizing: border-box;
			padding: 20rpx;
			display: flex;
			justify-content: space-around;
		}
	}
</style>
