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

		<view class="form">
			<view class="formTil">
				拜访信息
			</view>
			<!-- 拜访事由 -->
			<view class="cntnt">
				<view class="title">拜访事由</view>
				<picker mode="selector" :value="reasonIndex" :range="reason" @change="indexChange">
					<input type="text" v-model="reasonVal" disabled="true" placeholder="请选者拜访事由" />
				</picker>
			</view>
			<!-- 随行人数 -->
			<view class="cntnt">
				<view class="title">随行人数</view>
				<input type="text" v-model="viNumber" placeholder="请输入随行人数">
			</view>
			<view v-if="reasonIndex == 0&& reasonVal || reasonIndex == 4&& reasonVal" class="">
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
							<van-datetime-picker @close=" show = false" @confirm="userConfirm" type="datetime"
								value="currentDate" :min-date="minDate" :max-date="maxDate"> </van-datetime-picker>
						</van-popup>
					</view>
				</view>
				<!-- 结束时间 -->
				<view class="cntnt choose-time">
					<view class="title">结束时间</view>
					<view class="time">
						<input type="text" v-model="endTimeVal" @click="addEndTime" disabled="true"
							placeholder="请选择开始时间" />
						<!-- </picker> -->
						<van-popup :show="show" position="bottom" custom-style="height: 40%" @close="show = false">
							<van-datetime-picker @close=" show = false" @confirm="userConfirm" type="datetime"
								value="currentDate" :min-date="minDate" :max-date="maxDate"> </van-datetime-picker>
						</van-popup>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-btn-v">
			<button form-type="submit" open-type="share" type="primary">保存</button> 
		</view>
	</view>
</template>
<script>
	import { IDCAR_TYPE } from "@/utils/constant"
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
				reason: ['商务沟通', '面试', '探亲', '参观', '政务沟通'], // 拜访事由
				reasonIndex: 0, // 当前选中拜访事由
				reasonVal: '', //选择原因
				viNumber: '', //随行人数
				realName: '', //受访人姓名
				realPhone: '', //受访人电话
				show: false,
				minDate: new Date().getTime(),
				maxDate: new Date(2030, 10, 1).getTime(),
				currentDate: new Date().getTime(),
				isSandE: 1, //判断1是开始时间,2是结束时间
				startTimeVal: '', //开始时间
				endTimeVal: "", //结束时间
			}
		},
		onLoad() {
			this.getuserInfo(1)
		},
		methods: {
			//打开时间选择
			addStartTime() {
				this.show = !this.show
				this.isSandE = 1
			},
			addEndTime() {
				this.show = !this.show
				this.isSandE = 2
			},
			//时间确定
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
				var timer = y + '-' + addZero(M) + '-' + addZero(d) + " " + addZero(h) + ":" + addZero(m)
				this.show = false
				if (this.isSandE === 1) {
					this.startTimeVal = timer
				}
				if (this.isSandE === 2) {
					this.endTimeVal = timer
				}
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
				this.reasonVal = this.reason[e.detail.value]

			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			}
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

		.form {
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
