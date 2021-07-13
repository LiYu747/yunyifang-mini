<!-- 云易访物业版 -->
<template>
	<view class="real-estate">
		<form @submit="formSubmit" class="form">
			<!-- 楼层预约 -->
			<view class="row">
				<view class="title">预约楼层</view>
				<picker mode="selector" :value="floorIndex" :range="floors" @change="indexChange('floor',$event)"
					:class="floorIndex == 0 ? 'picker no-choose' : 'picker'">
					{{floors[floorIndex]}}
				</picker>
			</view>
			<!-- 所属单位 -->
			<view class="row">
				<view class="title">所属单位</view>
				<picker mode="selector" :value="companyIndex" :range="company" @change="indexChange('company',$event)"
					:class="companyIndex == 0 ? 'picker no-choose' : 'picker'">
					{{company[companyIndex]}}
				</picker>
			</view>
			<!-- 受访人姓名 -->
			<view class="row">
				<view class="title">受访人姓名</view>
				<input type="text" placeholder="请输入受访人姓名">
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
					<picker mode="date" :value="currentDate" :start="currentDate" end="2022-12-12" @change="changeDate">
						<view>{{checkedDate}}</view>
					</picker>
				</view>
			</view>
			<!-- 我的工牌 -->
				<view class="row uploadimg">
					<view class="title">我的工牌</view>
					<view class="content">
						<image
							:src="item"
							class="image" 
							mode="aspectFit"
							v-for="(item,index) in workCardUrl" 
							:key="index" 
							@click="previewImg(index,workCardUrl)"
							v-if="workCardUrl.length !== 0"></image>
						<view @click="chooseImg('workCard')" class="upload iconfont icon-shangchuantupian"></view>
					</view>
				</view>
				<!-- 我的名片 -->
					<view class="row uploadimg">
						<view class="title">我的名片</view>
						<view class="content">
							<image
								:src="item"
								class="image" 
								mode="aspectFit"
								v-for="(item,index) in buinessCardUrl" 
								:key="index" 
								@click="previewImg(index,buinessCardUrl)"
								v-if="buinessCardUrl.length !== 0"></image>
							<view @click="chooseImg('buinessCard')" class="upload iconfont icon-shangchuantupian"></view>
						</view>
					</view>
					<!-- 我的身份证 -->
						<view class="row uploadimg">
							<view class="title">我的身份证</view>
							<view class="content">
								<image
									:src="item"
									class="image" 
									mode="aspectFit"
									v-for="(item,index) in idCardUrl" 
									:key="index" 
									@click="previewImg(index,idCardUrl)"
									v-if="idCardUrl.length !== 0"></image>
								<view @click="chooseImg('idCard')" class="upload iconfont icon-shangchuantupian"></view>
							</view>
						</view>
			
			<view class="uni-btn-v">
				<button form-type="submit" open-type="share" type="primary">保存分享</button>
			</view>
		</form>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				floors: ['选择楼层', '1楼', '2楼', '3楼'], // 楼层信息
				floorIndex: 0, // 当前选中楼层索引
				company: ['选择单位', '四川省成都市利菲普斯科技有限公司',
					'四川省成都市利菲普斯科技有限公司',
					'四川省成都市利菲普斯科技有限公司'
				], // 所属单位信息
				companyIndex: 0, // 当前选中公司索引
				reason: ['选择事由','商务沟通', '面试', '探亲', '参观', '政务沟通'], // 拜访事由
				reasonIndex: 0, // 当前选中拜访事由
				currentDate: '', // 当前日期
				checkedDate: '', // 选中日期
				workCardUrl: [], // 工牌图片预览路径
				buinessCardUrl: [], // 名片图片预览路径 
				idCardUrl: [], // 身份证图片预览路径
			}
		},
		onLoad() {
			this.getCurrentDate()
		},
		methods: {
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
			// 获取当前时间
			getCurrentDate() {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				month = month < 9 ? `0${month}` : month
				day = day < 9 ? `0${day}` : day
				this.currentDate = `${year}-${month}-${day}`
				this.checkedDate = this.currentDate
			},
			// 选中日期
			changeDate(e) {
				console.log(e);
				this.checkedDate = e.target.value
			},
			// 点击选择图片
			chooseImg(type) {
				const that = this
				uni.chooseImage({
					count: 2,
					success(res) {
						switch(type){
							case 'workCard':
								that.workCardUrl = res.tempFilePaths
								break
							case 'buinessCard':
								that.buinessCardUrl = res.tempFilePaths
								break
							case 'idCard':
								that.idCardUrl = res.tempFilePaths
								break
						}
					}
				})
			},
			// 点击图片预览
			previewImg(index,urls) {
				uni.previewImage({
					urls,
					current: index,
					indicator: 'default',
					loop: true
				})
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
	.real-estate {
		box-sizing: border-box;
		font-size: 28rpx;
		padding: 20rpx;

		.form {

			// 每一行表单
			.row {
				width: 100%;
				height: 80rpx;
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
			.uploadimg{
				height: auto;
				padding: 20rpx 0;
				.content{
					width: 75%;
					display: flex;
					.image{
						width: 150rpx;
						height: 150rpx;
						margin-right: 10rpx;
					}
					.upload{
						width: 150rpx;
						height: 150rpx;
						background-color: #aaa;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #fff;
						font-size: 40rpx;
					}
				}
			}
		}
	}
</style>
