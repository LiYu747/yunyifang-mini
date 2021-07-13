<!-- 我的车辆页面 -->
<template>
	<view class="my-car">
		<view class="head">我的车辆</view>
		<view class="often-car">
			<view style="width: 50%;display: flex;justify-content: space-between;">
				<text class="iconfont icon-cheliang"></text>
				<text class="car-number">{{oftenCar}}</text>
			</view>
			<text class="often">常用车辆</text>
		</view>
		<scroll-view scroll-y="true" style="height: calc(100vh - 100rpx - 150rpx - 100rpx);">
			<view class="content">
				<!-- 每一条车牌信息 -->
				<view class="car" 
					v-for="(item,index) in cars" 
					:key="item.carNumber"
				>
					<!-- 车牌信息 -->
					<view class="top" @click="isSet(index)">
						<view style="width: 50%;display: flex;align-items: center;">
							<text class="iconfont icon-cheliang" style="margin-right: 80rpx;"></text>
							<text class="car-number">{{item.carNumber}}</text>
						</view>
						<text class="often" v-show="currentOften === index">常用车辆</text>
					</view>
					<!-- 车牌设置 -->
					<van-transition :show="currentSet === index" name="fade-right">
					  <view class="bottom">
					  	<button class="proup write" @click="showWrite">编辑</button>
					  	<button 
					  		class="proup" 
					  		@click="setOften(index)"
					  		:disabled="currentOften === index"
					  		:class="{disabled: currentOften === index}"
					  	>设为常用</button>
					  	<button class="proup delete" @click="deleteCar(index)">删除</button>
					  </view>
					</van-transition>
				</view>
			</view>
		</scroll-view>
		<view class="btn">
			<button class="add-btn" @click="addCar">添加车辆</button>
		</view>
		<van-overlay :show="isShow">
			<car-number @cancel="cancel" @sure="sure" :title="title"></car-number>
		</van-overlay>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cars: [ // 车牌信息
					{
						carNumber: '京·111111', // 车牌号
					},
					{
						carNumber: '京·222222', // 车牌号
					},
					{
						carNumber: '京·11111A', // 车牌号
					},
				],
				currentSet: 0, // 记录当前弹出设置索引
				currentOften: 0, // 记录当前设置为常用车牌索引
				isShow: false, // 是否显示编辑车牌组件
				title: '', // 车辆信息编辑框标题
			};
		},
		computed: {
			oftenCar() {
				if(this.cars[this.currentOften]){
					return this.cars[this.currentOften].carNumber
				}else{
					return '请添加车辆'
				}
			}
		},
		methods: {
			// 编辑框点击取消隐藏编辑框
			cancel() {
				this.isShow = false
			},
			// 编辑框点击确定修改车牌号并且隐藏编辑框
			sure(data) {
				if(data.type === 'write'){
					this.cars[this.currentSet].carNumber = data.car
				}else{
					const car = {}
					car.carNumber = data.car
					this.cars.push(car)
				}
				this.isShow = false
			},
			// 点击每一条车牌展示设置
			isSet(index) {
				this.currentSet = index
			},
			// 点击设置常用设置常用车牌
			setOften(index) {
				this.currentOften = index
			},
			// 点击删除，删除车辆信息
			deleteCar(index) {
				this.cars.splice(index,1)
				if(this.currentOften == index) {
					this.currentOften = 0
				}
			},
			// 点击编辑显示编辑车牌组件
			showWrite() {
				this.title = '修改车辆信息'
				this.isShow = true
			},
			// 点击遮罩层隐藏编辑车牌组件
			hidWrite() {
				this.isShow = false
			},
			// 点击添加车辆展示车辆信息编辑弹出层
			addCar() {
				this.title = '添加车辆信息'
				this.isShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-car{
		width: 100%;
		height: 100vh;
		.head{
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
			font-weight: bold;
			background-color: $bgcolor;
			color: #fff;
		}
		// 常用车辆卡片
		.often-car{
			display: flex;
			padding: 20rpx;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			height: 150rpx;
			background-color: #fff;
			box-shadow: $boxshadow;
			.iconfont{
				font-size: 40rpx;
				font-weight: bold;
				color: $bgcolor;
			}
			.car-number{
				font-size: 36rpx;
				font-weight: bold;
			}
			.often{
				font-size: 28rpx;
			}
		}
		.content{
			box-sizing: border-box;
			padding: 20rpx;
			// 每一条车牌信息
			.car{
				box-sizing: border-box;
				margin-bottom: 40rpx;
				.top{
					box-shadow: $boxshadow;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-radius: 20rpx;
					padding: 0 20rpx;
					height: 160rpx;
					margin-bottom: 10rpx;
					.iconfont{
						color: $bgcolor;
						font-size: 40rpx;
						font-weight: bold;
					}
					.car-number{
						font-size: 36rpx;
						font-weight: bold;
					}
					.often{
						font-size: 28rpx;
						color: #999;
					}
				}
				// 编辑选项
				.bottom{
					display: flex;
					justify-content: space-between;
					.proup{
						display: block;
						width: 33%;
						height: 60rpx;
						line-height: 60rpx;
						background-color: $bgcolor;
						border-radius: 10rpx;
						color: #fff;
						text-align: center;
						box-sizing: border-box;
						font-size: 28rpx;
					}
					// 设为常用后的按钮禁用样式
					.disabled{
						background-color: #eee;
						color: #aaa;
					}
				}
			}
		}
		// 添加按钮
		.btn{
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: $boxshadow;
			.add-btn{
				display: block;
				width: 50%;
				height: 60rpx;
				line-height: 60rpx;
				color: #fff;
				background-color: $bgcolor;
				font-size: 28rpx;
			}
		}
	}
</style>
