<!-- 企业注册信息填写 -->
<template>
	<view class="register-info">
		<scroll-view scroll-y class="scroll">
			<view class="content">
				<van-cell-group>
				  <van-field
				    placeholder="请输入单位名称"
				    :border="true"
				    label="单位名称:"
				  />
					<van-field
					  placeholder="请输入单位编码"
					  :border="true"
					  label="单位编码:"
					/>
					<van-field
					  placeholder="请输入账户名"
					  :border="true"
					  label="设置账户:"
					/>
					<van-field
					  placeholder="请输入密码"
					  :border="true"
					  label="设置密码:"
					/>
					<van-field
					  placeholder="请输入单位税号"
					  :border="true"
					  label="单位税号:"
					/>
					<van-field
					  placeholder="请输入手机号"
					  :border="true"
					  label="手机号:"
						:maxlength="11"
					/>
					<van-field
					    center
					    clearable
					    label="短信验证码"
					    placeholder="请输入短信验证码"
					    :border="false"
					    use-button-slot
					  >
					    <van-button 
								slot="button" 
								:disabled="isDisabled" 
								size="small" 
								type="primary" 
								@click="sendCode">
					      {{btnContent}}
					    </van-button>
					  </van-field>
				</van-cell-group>
				<view class="real-name">
					<view class="title">实名认证</view>
					<van-field
					  placeholder="请输入姓名"
					  :border="true"
					  label="姓名:"
					/>
					<van-field
					  placeholder="请输入身份证号"
					  :border="true"
					  label="身份证号:"
					/>
					<view class="row">
						<text class="left">手持身份证照片</text>
						<view class="right">
							<van-uploader
								image-fit="aspectFit"
								:file-list="fileList" 
								@after-read="afterRead"
								@delete="deleteImg"
								:multiple="true"
								:max-count="2"/>
						</view>
						<view class="notice">请确保照片中面部及身份证清晰可见且无PS</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="desc">
			<view class="pay">
				<button class="pay-btn" type="primary">支付4999元</button>
			</view>
			<itemDesc />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDisabled: false, // 判断发送验证码按钮是否禁用,
				btnContent: '发送验证码', // 验证码按钮内容，
				fileList: [], // 文件
			};
		},
		methods:{
			// 点击按钮发送验证码
			sendCode() {
				this.isDisabled = true;
				let time = 59;
				this.btnContent = `剩余${time}秒`
				let timer = setInterval(() => {
					time --,
					time = time < 10 ? `0${time}` : time
					this.btnContent = `剩余${time}秒`
					if(time == 0){
						this.isDisabled = false
						this.btnContent = '发送验证码'
						clearInterval(timer)
					}
				},1000)
			},
			// 上传文件后的回调函数，获取到对应文件的临时地址
			afterRead(e){
				console.log(e);
				const file = e.detail.file;
				file.forEach(item => {
					this.fileList.push({url: item.url})
				})
			},
			// 点击删除上传图片
			deleteImg(e){
				const index = e.detail.index
				console.log(e.detail.index);
				this.fileList.splice(index,1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.register-info{
		height: 100vh;
		.scroll{
			height: calc(100vh - 300rpx);
			.content{
				padding: 20rpx 0;
				.real-name{
					margin-top: 30rpx;
					.title{
						padding: 0 30rpx;
						font-size: 30rpx;
						color: #333;
						font-weight: bold;
						margin-bottom: 20rpx;
					}
					.row{
						.left{
							display: block;
							width: 100%;
							text-align: center;
							font-size: 28rpx;
							color: #666;
							padding: 20rpx;
						}
						.notice{
							font-size: 24rpx;
							text-align: center;
							color: #aaa;
						}
					}
				}
			}
		}
		.desc{
			width: 100%;
			height: 300rpx;
			box-sizing: border-box;
			padding-top: 20rpx;
			position: fixed;
			bottom: 0;
			box-shadow: $boxshadow;
			.pay{
				padding: 0 40rpx;
				.pay-btn{
					height: 80rpx;
					line-height: 80rpx;
				}
			}
		}
	}
</style>
