<!-- 我的页面 -->
<template>
	<view class="">
		<view class="profile">
			<view class="content">
				<!-- 修改姓名 -->
				<view class="row">
					<text class="title">姓名</text>
					<input type="text" placeholder="请输入姓名" v-model="formData.name">
				</view>
				<!-- 手机号输入 -->
				<view class="row">
					<text class="title">手机号</text>
					<input type="number" :maxlength="11" placeholder="请输入手机号" v-model="formData.phone">
				</view>
				<!-- 证件类型 -->
				<view class="row">
					<text class="title">证件类型</text>
					<picker
						mode="selector" 
						:value="formData.idCardType - 1"
						:range="types" 
						@change="changeIndex"
					 >
					   <input type="text" disabled="true" placeholder="请选择证件类型" v-model="typeText">
					</picker>
				</view>
				
				<!-- 身份证输入 -->
				<view class="row">
					<text class="title">证件号</text>
					<input type="number" :maxlength="18" placeholder="请输入证件号码"
						v-model="formData.idCardNo">
				</view>
				<!-- 性别 -->
				<view class="row">
					<text class="title">性别</text>
					<view class="sex">
						<van-radio-group direction="horizontal" :value="formData.gender + ''" @change="onChange">
							<van-radio name="1">男</van-radio>
							<van-radio name="2">女</van-radio>
						</van-radio-group>
					</view>
				</view>
				<!-- 证件类型 -->
				<view class="row">
					<text class="title">车牌号</text>
					<input type="text"  placeholder="请输入车牌号" v-model="formData.carNo">
				</view>
				<!-- 我的单位 -->
				<view class="row">
					<text class="title">我的单位</text>
					<input type="text" placeholder="请输入单位" v-model="formData.companyName">
				</view>
				<!-- 我的岗位 -->
				<view class="row">
					<text class="title">我的岗位</text>
					<input type="text" placeholder="请输入岗位" v-model="formData.companyJob">
				</view>
			</view>
			<!-- 保存按钮,开始云访按钮 -->
			<view class="btn">
				<button type="primary" class="save-btn" @click="saveInfo">保存信息</button>
			</view>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import { IDCAR_TYPE } from "@/utils/constant"
	export default {
		data() {
			return {
				formData:{
				id:"",//用户id
				gender: 1, //性别
				name: '', // 姓名
				phone: '', // 手机号
				idCardNo: '', // 身份证号
				carNo:'', //车牌号
				companyName: '', // 公司
				companyJob: '', // 岗位 
				idCardType: 1,
				},
				types: ['身份证', '护照', '驾驶证'],
				typeText: '',	
			}
		},
		onLoad(option) {
			this.getuserInfo(option.id)
		},
		methods: {
			changeIndex(e){
				this.formData.idCardType =  parseInt(e.detail.value) + 1 
				this.typeText = this.types[e.detail.value]
			},
			onChange(e) {
				this.formData.gender = e.detail 
			},
			async getuserInfo(id) {
				const res = await this.$api.getinfo(id);
				const data = res.data
				this.formData = res.data
				this.typeText = IDCAR_TYPE[data.idCardType]
			},

			// 点击保存信息验证表单，提交表单
			saveInfo() {
				// 电话号码验证正则
				const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				// 身份证正则验证
				const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (!phoneReg.test(this.formData.phone)) {
					uni.showToast({
						icon: 'none',
						title: '手机号码格式不正确！',
						duration: 2000,
					})
					return;
				}
				if(!this.formData.id){ 
				  this.pushUserInfo()
				  return;
				}
				this.addSave()
			},
			//修改信息
			async addSave (){
				const res = await this.$api.setUser(this.formData.id,{
					id:this.formData.id,
					gender: this.formData.gender, //性别
					name: this.formData.name, // 姓名
					phone: this.formData.phone, // 手机号
					idCardNo: this.formData.idCardNo, // 身份证号
					carNo: this.formData.carNo, //车牌号
					companyName:this.formData.companyName, // 公司
					companyJob:this.formData.companyJob, // 岗位 
					idCardType: this.formData.idCardType,
				})
				if(res.statusCode == 200){
					uni.showToast({
						icon:"none",
						default:3000,
						title:"修改成功"
					})
				}
			},
			// 增添信息
			async pushUserInfo (){
				const res = await this.$api.pushUser({
					gender: this.formData.gender, //性别
					name: this.formData.name, // 姓名
					phone: this.formData.phone, // 手机号
					idCardNo: this.formData.idCardNo, // 身份证号
					carNo: this.formData.carNo, //车牌号
					companyName:this.formData.companyName, // 公司
					companyJob:this.formData.companyJob, // 岗位 
					idCardType: this.formData.idCardType,
				})
				if(res.statusCode == 200){
					uni.showToast({
						icon:"none",
						default:3000,
						title:"保存成功"
					})
				}
			},
			// 上传图片后回调
			afterRead(type, e) {
				console.log(e);
				const file = e.detail.file
				switch (type) {
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
			deleteImg(type, e) {
				const index = e.detail.index
				switch (type) {
					case 'workCard':
						this.workCardUrl.splice(index, 1)
						break
					case 'bussinessCard':
						this.bussinessCardUrl.splice(index, 1)
						break
					case 'idCard':
						this.idCardUrl.splice(index, 1)
						break
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.profile {
		width: 100%;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #333;
		padding: 20rpx;

		.content {
			box-sizing: border-box;
			box-shadow: $boxshadow;

			.row {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 20rpx;

				border: {
					top: 2rpx solid #eee;
					left: 2rpx solid #eee;
					right: 2rpx solid #eee;
				}

				;

				// 每一行标题
				.title {
					display: block;
					width: 20%;
					font-weight: bold;
				}
				input{
					width: 400rpx;
				}

				/deep/ .input-placeholder {
					color: #aaa;
				}

				// 人证对比
				.test {
					color: #333;

					.nopass {
						margin-right: 20rpx;
					}
				}

				// 性别
				.sex {
					display: flex;

					.sex-type {
						display: flex;
						align-items: center;
						margin-right: 20rpx;

						.radio {
							display: block;
							margin-left: 5rpx;
							width: 20rpx;
							height: 20rpx;
							border: 2rpx solid #aaa;
							border-radius: 50%;
						}

						.checked {
							border: 2rpx solid $comcolor;
							background-color: $comcolor;
						}
					}
				}

				// 车牌
				.car-number {
					display: flex;
					align-items: center;

					.province {
						width: 50rpx;
						height: 50rpx;
						border: 2rpx solid #eee;
						text-align: center;
						line-height: 50rpx;
					}
				}
			}

			// 省份组件样式
			.province-head {
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 10rpx;
				font-size: 28rpx;

				.cancel {
					color: #aaa;
				}

				.sure {
					color: $comcolor;
				}
			}

			.province-content {
				padding: 20rpx 0;
				display: flex;
				flex-wrap: wrap;

				.name {
					width: 50rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					border: 2rpx solid #eee;
					margin: 10rpx;
				}

				// 当前被选中省份样式
				.checked {
					color: #fff;
					background-color: $comcolor;
				}
			}
		}

		.btn {
			box-sizing: border-box;
			padding: 20rpx 0;

			.save-btn {
				display: block;
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
