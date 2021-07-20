<!-- 我的页面 -->
<template>
	<view class="profile">
		<view class="content">
			<!-- 系统角色 -->
		<!-- 	<view class="row">
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
			</view> -->
			<!-- 修改姓名 -->
			<view class="row">
				<text class="title">姓名</text>
				<input type="text" placeholder="请输入姓名" v-model="name">
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
			<!-- 系统角色 -->
				<view class="row">
					<text class="title">证件类型</text>
					<picker 
						mode="selector" 
						:value="roleIndex"
						:range="types" 
						:style="{color: roleIndex == 0 ? '#aaa': '#333'}"
						@change="changeTpye"
					 >
						<view>请选择你的证件类型</view>
					</picker>
				</view>
			<!-- 身份证输入 -->
			<view class="row">
				<text class="title">证件号</text>
				<input type="number" :maxlength="11" placeholder="请输入手机号" v-model="phoneNumber">
			</view>
			<!-- 性别 -->
			<view class="row">
				<text class="title">性别</text>
				<view class="sex">
					<van-radio-group  direction="horizontal" :value="radio" @change="onChange">
					  <van-radio name="1">男</van-radio>
					  <van-radio name="2">女</van-radio>
					</van-radio-group>
				</view>
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
			<!-- 我的工牌 -->
			<view class="row" style="position: relative;padding-top: 40rpx;">
				<text style="position: absolute;top: 6rpx;right: 20rpx; z-index: 2;font-size: 20rpx;">仅限受访人可见</text>
				<text class="title">我的工牌</text>
				<!-- 图片上传 -->
				<view class="upload">
					<van-uploader 
						:file-list="workCardUrl" 
						@after-read="afterRead('workCard',$event)"
						@delete="deleteImg('workCard',$event)"
						 :max-count="1"
						 image-fit="aspectFit"
						 preview-size="150rpx"
					 />
				</view>
			</view>
			<!-- 我的名片 -->
			<view class="row" style="position: relative;padding-top: 40rpx;">
				<text class="title">我的名片</text>
				<!-- 图片上传 -->
				<view class="upload">
					<van-uploader 
						:file-list="bussinessCardUrl" 
						@after-read="afterRead('bussinessCard',$event)"
						@delete="deleteImg('bussinessCard',$event)"
						 :max-count="1"
						 image-fit="aspectFit"
						 preview-size="150rpx"
					 />
				</view>
			</view>
			<!-- 我的身份证 -->
			<view class="row" style="position: relative;padding-top: 40rpx;">
				<text style="position: absolute;top: 6rpx;right: 20rpx; z-index: 2;font-size: 20rpx;">仅限安保人员核验时可见,验后自焚</text>
				<text class="title">我的身份证</text>
				<!-- 图片上传 -->
				<view class="upload">
					<van-uploader 
						:file-list="idCardUrl" 
						@after-read="afterRead('idCard',$event)"
						@delete="deleteImg('idCard',$event)"
						 :max-count="2"
						 image-fit="aspectFit"
						 preview-size="150rpx"
					 />
				</view>
			</view>
		</view>
		<!-- 保存按钮,开始云访按钮 -->
		<view class="btn">
			<button type="primary" class="save-btn" @click="saveInfo">保存信息</button>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				radio: "1",
				name: '',// 姓名
				phoneNumber: '', // 手机号
				idCardNumber: '', // 身份证号
				sex: '男', // 性别
				manChecked: true, // 性别选中标志
				company: '', // 公司
				job: '', // 岗位
				role: '请选择你的角色', // 系统角色
				roles: ['请选择你的角色','助理','门岗安保','普通用户'], // 系统角色组
				types:['身份证','护照','驾驶证'],
				typesIndex:0,
				roleIndex: 0, // 系统角色索引
				currentProvince: 0,
				workCardUrl: [], // 上传工牌图片预览路径
				idCardUrl: [], // 上传身份证图片预览路径
				bussinessCardUrl: [], // 上传名片图片预览路径
			}
		},
		onLoad(option){
			this.getuserInfo(option.id)
		},
		methods: {
			onChange(e){
				this.radio = e.detail
			},
			changeTpye(e){
				this.roleIndex = e.target.value
				this.role = this.types[this.roleIndex]
				
			},
			async getuserInfo(id){
				const res = await this.$api.getinfo(id);
				const data = res.data
				console.log(res,'tid'); 
				this.name = data.name
				this.phoneNumber = data.phone
				this.idCardNumber = data.idCardNo
				this.radio =  data.gender.toString()
				this.company = data.companyName
				this.job = data.companyJob
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
						duration: 2000,
						success() {
							return
						}
					})
				}
				
				// 跳转对应角色的我的拜访页面
				const {role} = this
				switch(role){
					case '助理':
						getApp().globalData.roleType = 'assistant'
						uni.navigateTo({
							url: `/pages/assistant/assistant`
						})
						break
					case '门岗安保':
						getApp().globalData.roleType = 'guard'
						uni.navigateTo({
							url: `/pages/guard/guard`
						})
						break
					case '普通用户':
						getApp().globalData.roleType = 'commonUser'
						uni.navigateTo({
							url: `/pages/common-user/common-user`
						})
						break
					case '请选择你的角色':
						break
				}
			},
			// 上传图片后回调
			afterRead(type,e) {
				console.log(e);
				const file = e.detail.file
				switch(type) {
					case 'workCard':
						this.workCardUrl.push(file)
						break
					case 'bussinessCard':
						this.bussinessCardUrl.push(file)
						break
					case 'idCard':
						this.idCardUrl.push(file)
						break
				}
			},
			// 点击删除图片
			deleteImg(type,e){
				const index = e.detail.index
				switch(type) {
					case 'workCard':
						this.workCardUrl.splice(index,1)
						break
					case 'bussinessCard':
						this.bussinessCardUrl.splice(index,1)
						break
					case 'idCard':
						this.idCardUrl.splice(index,1)
						break
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.profile{
		width: 100%;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #333;
		padding: 20rpx;
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
			padding: 20rpx 0;
			.save-btn{
				display: block;
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
