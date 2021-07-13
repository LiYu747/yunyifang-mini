<!-- 云易访物业版 -->
<template>
	<view class="real-estate">
		<form @submit="formSubmit" class="form">
			<!-- 受访人姓名 -->
			<view class="row">
				<view class="title">受访人姓名</view>
				<input type="text" placeholder="请输入受访人姓名">
			</view>
			<!-- 所属单位 -->
			<view class="row">
				<view class="title">所属单位</view>
				<picker mode="selector" :value="companyIndex" :range="company" @change="indexChange('company',$event)"
					:class="companyIndex == 0 ? 'picker no-choose' : 'picker'">
					{{company[companyIndex]}}
				</picker>
			</view>
			<!-- 受访人岗位 -->
			<view class="row">
				<view class="title">受访人岗位</view>
				<input class="input" type="text" placeholder="请输入受访人岗位">
			</view>
			<!-- 受访人手机 -->
			<view class="row">
				<view class="title">受访人手机</view>
				<input type="number" placeholder="请输入受访人手机" :maxlength="11">
			</view>
			<!-- 短信通知 -->
			<view class="sms"
				style="text-align: right;height: 80rpx;box-sizing: border-box;border-bottom: 2rpx solid #eee;line-height: 80rpx;">
				<label>
					<checkbox style="transform: scale(0.7);"></checkbox>是否以短信通知对方
				</label>
			</view>
			<!-- 拜访事由 -->
			<view class="row">
				<view class="title">拜访事由</view>
				<picker mode="selector" :value="reasonIndex" :range="reason" @change="indexChange('reason',$event)"
					:class="reasonIndex == 0 ? 'picker no-choose' : 'picker'">
					{{reason[reasonIndex]}}
				</picker>
			</view>
			<!-- 随行人数 -->
			<view class="row">
				<view class="title">随行人数</view>
				<input type="text" placeholder="请输入随行人数">
			</view>
			<!-- 预约时间 -->
			<view class="row choose-time">
				<view class="title">预约时间</view>
				<view class="time">
					<text @click="showDate = true" :class="rangeTime == '选择时间' ? 'no-choose' : ''">{{rangeTime}}</text>
				</view>
				<van-popup :show="showDate" position="bottom">
					<view style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 20rpx;font-size: 30rpx;">
						<text @click="cancel" style="color: #aaa;">取消</text>
						<text>时间</text>
						<text @click="sureTime" style="color: rgb(26,173,25);">确认</text>
					</view>
					<time-selector
						@selectTime="getChooseTime"
					></time-selector>
				</van-popup>
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

			<view class="btn">
				<button form-type="submit" class="bottom-btn" open-type="share" type="primary">保存分享</button>
				<button type="primary" class="bottom-btn" @click="toHome">我的拜访</button>
			</view>
		</form>
	</view>
</template>
<script>
	import timeSelector from '@/components/xiujun-time-selector/index.vue';
	export default {
		components:{
			timeSelector
		},
		data() {
			return {
				floors: ['选择楼层', '1楼', '2楼', '3楼'], // 楼层信息
				floorIndex: 0, // 当前选中楼层索引
				company: ['选择单位', '四川省成都市利菲普斯科技有限公司',
					'四川省成都市利菲普斯科技有限公司',
					'四川省成都市利菲普斯科技有限公司'
				], // 所属单位信息
				companyIndex: 0, // 当前选中公司索引
				reason: ['选择事由', '商务沟通', '面试', '探亲', '参观', '政务沟通'], // 拜访事由
				reasonIndex: 0, // 当前选中拜访事由
				workCardUrl: [], // 工牌图片预览路径
				bussinessCardUrl: [], // 名片图片预览路径 
				idCardUrl: [], // 身份证图片预览路径
				showDate: false, // 年月日选择器展示标志
				rangeTime: '选择时间', // 预约时间段
				oldRangeTime: '选择时间', // 上一次确定的预约时间段
			};
		},
		onLoad() {
			
		},
		// 分享后触发,可决定分享的内容
		onShareAppMessage(e) {
			console.log(e);
			return {
				title: '您有一个预约拜访，请点击查看',
				path: '/pages/subscribe/subscribe',
				imageUrl: '../../static/logo.png'
			}
		},
		methods: {
			// 获取预约时间段
			getChooseTime(e) {
				this.rangeTime = e
			},
			// 点击取消关闭时间选择器弹出层，并且不选中这次内容
			cancel() {
				this.rangeTime = this.oldRangeTime
				this.showDate = false
			},
			// 点击确认关闭时间选择器弹出层
			sureTime() {
				this.oldRangeTime = this.rangeTime
				this.showDate = false
			},
			// picker中的选中改变Index显示对应内容
			indexChange(type, e) {
				switch (type) {
					case 'floor':
						this.floorIndex = e.detail.value
						break
					case 'company':
						this.companyIndex = e.detail.value
						break
					case 'reason':
						this.reasonIndex = e.detail.value
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
			// 表单提交
			formSubmit: function(e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// var formdata = e.detail.value
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
			},
			// 点击我的拜访跳转我的拜访页面
			toHome() {
				const {
					roleType
				} = getApp().globalData
				if (roleType === 'assistant') {
					uni.navigateTo({
						url: "/pages/assistant/assistant"
					})
				} else if (roleType === 'guard') {
					uni.navigateTo({
						url: "/pages/guard/guard"
					})
				} else if (roleType === 'commonUser') {
					uni.navigateTo({
						url: "/pages/common-user/common-user"
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.real-estate {
		box-sizing: border-box;
		font-size: 24rpx;
		padding: 20rpx;

		.form {

			// 每一行表单
			.row {
				width: 100%;
				//height: 80rpx;
				padding: 20rpx 0;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #eee;

				.title {
					width: 25%;
					color: #333;
					font-weight: bold;
				}

				.picker {
					width: 75%;
					display: flex;
					align-items: center;
					box-sizing: border-box;
				}

				// picker没有选则内容时候的字体样式
				.no-choose {
					color: #aaa;
				}

				// 修改输入框占位文本样式
				/deep/ .input-placeholder {
					color: #aaa;
				}
			}

			// 上传图片行样式
			.uploadimg {
				height: auto;
				padding: 20rpx 0;

				.content {
					width: 75%;
					display: flex;

					.image {
						width: 150rpx;
						height: 150rpx;
						margin-right: 10rpx;
					}

					.upload {
						width: 150rpx;
						height: 150rpx;
						background-color: #eee;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #fff;
						font-size: 40rpx;
					}
				}
			}

			// 底部按钮
			.btn {
				display: flex;
				padding-top: 20rpx;

				.bottom-btn {
					display: block;
					font-size: 28rpx;
					height: 60rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
