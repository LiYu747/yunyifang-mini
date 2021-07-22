<!-- 云易访物业版 -->
<template>
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
				<picker mode="selector" :value="formData.idCardType - 1" :range="types" @change="changeIndex">
					<input type="text" disabled="true" placeholder="请选择证件类型" v-model="typeText">
				</picker>
			</view>

			<!-- 身份证输入 -->
			<view class="row">
				<text class="title">证件号</text>
				<input type="number" :maxlength="18" placeholder="请输入证件号码" v-model="formData.idCardNo">
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
				<input type="text" placeholder="请输入车牌号" v-model="formData.carNo">
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
		<view class="reasonBox">
			<!-- 拜访事由 -->
			<view class="cntnt">
				<view class="title">拜访事由</view>
				<picker mode="selector" :value="reasonIndex" range-key='titel' :range="reason" @change="indexChange">
					<input type="text" v-model="reasonVal" disabled="true" placeholder="请选者拜访事由" />
				</picker>
			</view>
			<!-- 随行人数 -->
			<view class="cntnt">
				<view class="title">随行人数</view>
				<input type="text" v-model="viNumber" placeholder="请输入随行人数">
			</view>
		</view>
		<view v-if="reasonIndex == 1&& reasonVal || reasonIndex == 2&& reasonVal" class="form">
			<view class="formTil">
				拜访信息
			</view>
			<view class="">
				<!-- 拜访人姓名 -->
				<view class="cntnt">
					<view class="title">受访人姓名</view>
					<input type="text" v-model="realName" placeholder="请输入受访人姓名">
				</view>
				<!-- 拜访人电话 -->
				<view class="cntnt">
					<view class="title">受访人电话</view>
					<input type="text" v-model="realPhone" placeholder="请输入受访人电话">
				</view>

				<!-- 开始时间 -->
				<view class="cntnt choose-time">
					<view class="title">开始时间</view>
					<view class="time">
						<!-- <picker mode="date" :value="currentDate" :start="currentDate" end="2022-12-12" @change="changeDate"> -->
						<input type="text" v-model="startTimeVal" @click="addStartTime" disabled="true"
							placeholder="请选择开始时间" />
						<!-- </picker> -->
						<van-popup :show="show" position="bottom" custom-style="height: 40%" @close="show = false">
							<van-datetime-picker @cancel="show = false" @confirm="userConfirm" type="datetime"
								value="currentDate" :min-date="minDate" :max-date="maxDate"> </van-datetime-picker>
						</van-popup>
					</view>
				</view>
				<!-- 结束时间 -->
				<view class="cntnt choose-time">
					<view class="title">结束时间</view>
					<view class="time">
						<input type="text" v-model="endTimeVal" @click="addEndTime" disabled="true"
							placeholder="请选择结束时间" />
						<van-popup :show="endshow" position="bottom" custom-style="height: 40%"
							@close="endshow = false">
							<van-datetime-picker @cancel="endshow = false" @confirm="endConfirm" type="datetime"
								value="currentDate" :min-date="endminDate" :max-date="endmaxDate">
							</van-datetime-picker>
						</van-popup>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-btn-v">
			<button @click="submit" type="primary">保存</button>
		</view>
	</view>
</template>
<script>
	import {
		IDCAR_TYPE
	} from "@/utils/constant"
	import {
		Reason_TYPES
	} from '@/utils/constant'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				formData: {
					id: "", //用户id
					gender: 1, //性别
					name: '', // 姓名
					phone: '', // 手机号
					idCardNo: '', // 身份证号
					carNo: '', //车牌号
					companyName: '', // 公司
					companyJob: '', // 岗位 
					idCardType: 1,
				},
				types: ['身份证', '护照', '驾驶证'],
				typeText: '',
				reason: Reason_TYPES, // 拜访事由
				reasonIndex: 0, // 当前选中拜访事由
				reasonId: '',
				reasonVal: '', //选择原因
				viNumber: '', //随行人数
				realName: '', //受访人姓名
				realPhone: '', //受访人电话
				show: false,
				minDate: new Date().getTime(),
				maxDate: new Date(2030, 10, 1).getTime(),
				currentDate: new Date().getTime(),
				startTimeVal: '', //开始时间
				endTimeVal: "", //结束时间
				endshow: false, //结束时间打开选择
				endminDate: '',
				endmaxDate: '',
			}
		},
	
		methods: {
			//保存
			async submit() {
				let res = await this.$api.addWxvisit({
					tid: this.formData.id,
					name: this.formData.name,
					gender: this.formData.gender,
					phone: this.formData.phone,
					idCardType: this.formData.idCardType,
					idCardNo: this.formData.idCardNo,
					companyName: this.formData.companyName,
					companyJob: this.formData.companyJob,
					carNo: this.formData.carNo,
					intervieweeName: this.realName,
					intervieweePhone: this.realPhone,
					intervieweeStartTime: this.startTimeVal,
					intervieweeEndTime: this.endTimeVal,
					reasonType: this.reasonId,
					followAmount: this.viNumber,
					intervieweeCompanyCode: 'XXXZ', //二维码获得的数据
				})
				if (res.statusCode == 200) {
					uni.showToast({
						icon: 'none',
						title: "保存成功",
						default: 3000
					})
				}
			},
			changeIndex(e) {
				this.formData.idCardType = parseInt(e.detail.value) + 1
				this.typeText = this.types[e.detail.value]
			},
			onChange(e) {
				this.formData.gender = e.detail
			},
			//打开时间选择
			addStartTime() {
				this.show = !this.show
			},
			addEndTime() {
				if (!this.startTimeVal) {
					uni.showToast({
						icon: "none",
						title: "请先选择开始时间",
						default: 3000
					})
					return;
				}
				this.endshow = !this.endshow
			},
			//开始时间确定
			userConfirm(e) {
				function addZero(m) {
					return m < 10 ? '0' + m : m;
				}
				var time = new Date(e.detail);
				var y = time.getFullYear()
				var M = time.getMonth() + 1
				var d = time.getDate();
				var h = time.getHours();
				var m = time.getMinutes()
				var timer = y + '-' + addZero(M) + '-' + addZero(d) + " " + addZero(h) + ":" + addZero(m) + ':00'
				this.show = false
				this.startTimeVal = timer
				this.endmaxDate = new Date(y, addZero(M - 1), addZero(d), 23, 59).getTime()
				this.endminDate = new Date(y, addZero(M - 1), addZero(d), addZero(h), addZero(m)).getTime()

			},

			// 结束时间确定
			endConfirm(e) {
				function addZero(m) {
					return m < 10 ? '0' + m : m;
				}
				var time = new Date(e.detail);
				var y = time.getFullYear()
				var M = time.getMonth() + 1
				var d = time.getDate();
				var h = time.getHours();
				var m = time.getMinutes()
				var timer = y + '-' + addZero(M) + '-' + addZero(d) + " " + addZero(h) + ":" + addZero(m) + ':00'
				let tampLogin = new Date(timer.replace(/-/g, '/')).getTime() - new Date(this.startTimeVal.replace(/-/g,
					'/')).getTime();
				if (tampLogin < 1 && this.startTimeVal) {
					uni.showToast({
						icon: 'none',
						title: '必须大于开始时间',
						duration: 3000
					})
					return;
				}
				this.endTimeVal = timer
				this.endshow = false
			},

			async getuserInfo(id) {
				const res = await this.$api.getinfo(id);
				const data = res.data
				this.formData = res.data
				this.typeText = IDCAR_TYPE[data.idCardType]
			},
			// picker中的选中改变Index显示对应内容
			indexChange(e) {
				this.reasonIndex = e.detail.value
				this.reasonVal = this.reason[e.detail.value].titel
				this.reasonId = this.reason[e.detail.value].id
			},
		},
        onLoad() {
        	if(!storage.getUserInfo()) return;
            let userinfo =   storage.getUserInfo()
        	this.getuserInfo(userinfo.id)
        },
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
			border-radius: 10rpx;

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

				input {
					width: 400rpx;
				}

				/deep/ .input-placeholder {
					color: #aaa;
				}
			}
		}

		.reasonBox {
			margin-top: 30rpx;
			box-sizing: border-box;
			box-shadow: $boxshadow;
			padding: 40rpx 20rpx;
			border-radius: 10rpx;

			.cntnt {
				margin-top: 30rpx;
				font-size: 28rpx;
				font-weight: 400;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				.title {
					display: block;
					width: 25%;
				}
			}
		}

		.form {
			width: 100%;
			margin-top: 30rpx;
			box-sizing: border-box;
			box-shadow: $boxshadow;
			padding: 40rpx 20rpx;
			border-radius: 10rpx;

			.formTil {
				font-size: 36rpx;
				font-weight: bold;
				color: #000000;
			}

			.cntnt {
				margin-top: 30rpx;
				font-size: 28rpx;
				font-weight: 400;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				.title {
					display: block;
					width: 25%;
				}
			}
		}

		.uni-btn-v {
			margin: 40rpx 0;
		}
	}
</style>
