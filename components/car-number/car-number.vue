<!-- 车牌修改添加组件 -->
<template>
	<view class="car-number">
		<view class="head-title">{{title}}</view>
		<view class="row">
			<view class="province" @click="showProvince">{{province}}</view>
			<text class="point">·</text>
			<vcode-input :sum="7" :autofocus="false" @sendValue="sendValue"></vcode-input>
		</view>
		
		<view class="btn">
			<button class="button cancel" size="mini" @click="cancel">取消</button>
			<button class="button sure" size="mini" type="primary" @click="sure">确定</button>
		</view>
		
		<!-- 省份选择弹出层 -->
		<van-popup :show="isShowProvince" position="bottom" :overlay="false" round>
			<view class="province-head">
				<text style="color: #aaa;" @click="hidProvince">取消</text>
				<text>省份</text>
				<text style="color: #4CD964;" @click="sureProvince">确认</text>
			</view>
			<view class="all-province">
				<view 
					class="province-item"
					v-for="(item,index) in provinceArr"
					:key="index"
					@click="provinceChecked(index)"
					:class="currentProvince === index ? 'checked' : ''"
				>{{item}}</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import VcodeInput from '@/components/vcode-input/vcode-input'
	export default {
		data() {
			return {
					isShowProvince: false, // 展示省份组件
					provinceArr: [], // 省份数组
					province: '', // 省份
					currentProvince: 0, // 当前选中省份样式
					number: '', // 车牌数字
			}
		},
		props: {
			title: {
				type: String
			}
		},
		created() {
			// 省份数组赋值
			const province = '京津黑吉辽冀豫鲁晋陕蒙宁甘新青藏鄂皖苏沪浙闵湘赣川渝黔云粤桂琼港澳台';
			this.provinceArr = province.split('')
			this.province = this.provinceArr[this.currentProvince]
		},
		computed: {
			car() {
				return this.province+'·'+this.number
			}
		},
		methods: {
			// 取消编辑车牌
			cancel() {
				this.$emit('cancel')
			},
			// 确定车牌
			sure() {
				// 正则验证车牌号
				const car = this.province + this.number
				const carReg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;
				if(carReg.test(car)){
					let type = this.title === '修改车辆信息' ? 'write' : 'add'
					this.$emit('sure',{type,car: this.car})
				}else{
					uni.showToast({
						icon: 'none',
						title: '车牌号格式不正确',
						duration: 2000
					})
				}
			},
			// 输入车牌号码值
			sendValue(value) {
				this.number = value
			},
			// 点击选中省份
			provinceChecked(index) {
				this.currentProvince = index
			},
			// 点击省份框弹出省份弹出层
			showProvince() {
				this.isShowProvince = true
			},
			// 点击取消隐藏省份弹出层
			hidProvince(){
				this.isShowProvince = false
			},
			// 点击确认将选中的内容赋值到省份内容框,并且隐藏省份弹出层
			sureProvince() {
				this.province = this.provinceArr[this.currentProvince]
				this.isShowProvince = false
			}
		},
		components: {
			VcodeInput
		}
	}
</script>

<style lang="scss" scoped>
	.car-number{
		width: 85%;
		margin: 200rpx auto;
		background-color: #fff;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		// 车牌号样式
		.row{
			display: flex;
			align-items: center;
			margin: 40rpx 0;
			.province{
				width: 50rpx;
				height: 50rpx;
				border: 2rpx solid #333;
				line-height: 50rpx;
				text-align: center;
				box-sizing: border-box;
				font-size: 28rpx;
			}
			.point{
				display: block;
				width: 50rpx;
				height: 50rpx;
				font-weight: bold;
				text-align: center;
				line-height: 50rpx;
			}
		}
		// 取消确定按钮样式按钮
		.btn{
			display: flex;
			.button{
				display: block;
				margin-right: 10rpx;
			}
		}
		// 省份弹出层样式
		.province-head{
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 20rpx;
			padding-bottom: 0;
			font-size: 28rpx;
		}
		.all-province{
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding: 20rpx;
			font-size: 28rpx;
			.province-item{
				width: 50rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				box-sizing: border-box;
				border: 2rpx solid #aaa;
				color: #aaa;
				margin: 10rpx;
				border-radius: 10rpx;
			}
			// 选中省份样式
			.checked{
				background-color: $comcolor;
				color: #fff;
				border-color: $comcolor;
			}
		}
	}
</style>
