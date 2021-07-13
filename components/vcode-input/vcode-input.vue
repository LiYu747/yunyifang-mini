<template>
	<view class="vcode-input-body">
		<text class="vcode-input-item" 
		:class="isBorderLine?'vcode-input-line':'vcode-input-border'"
		v-for="(v,index) in sum" 
		:key="index"
		@tap.stop="setFocus"
		:style="[getStyle(index)]"
		>
			{{ text[index]?text[index]:'' }}
		</text>
		<view class="hidden-input">
			<input
			id="vcodeInput"
			ref="vcodeInput"
			type="text" 
			:show-confirm-bar="false"
			auto-blur
			:focus="focus"
			:maxlength="sum"
			v-model="value"
			@blur="setBlur"
			@focus="setFocus"
			:password="isPassword"
			@input="sendValue"
			placeholder="验证码"/>
		</view>
	</view>
</template>

<script>
	export default {
		name:'VcodeInput',
		props: {
			autofocus:{
				type: Boolean,
				default: true
			},
			sum:{
				type: Number,
				default: 6
			},
			isBorderLine:{
				type:Boolean,
				default:false
			},
			borderColor:{
				type:String,
				default:'#DADADA'
			},
			borderValueColor:{
				type:String,
				default:'#424456'
			},
			borderActiveColor:{
				type:String,
				default:'#FF6B00'
			},
			isAutoComplete:{
				type: Boolean,
				default: true
			},
			isPassword:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				focus:false,
				text:[],
				value:''
			};
		},
		watch:{
			value(value,oldVal){
				this.$emit('getInputValue', value);
				if(this.isAutoComplete){
					if(value.length>=this.sum){
						this.focus=false;
						this.$emit('vcodeInput', value);
					}
				}else{
					this.$emit('vcodeInput', value);
				}
				if(this.isPassword){
					let val='';
					for (let i = 0; i < value.length; i++) {
						val+='●';
					}
					this.text=val;
				}else{
					this.text=value.split("");
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initInput()
			})
		},
		methods:{
			sendValue() {
				this.$emit('sendValue',this.value)
			},
			getStyle(index){
				return {
					borderColor:this.text.length===index&&this.focus?this.borderActiveColor:(this.text.length>index?this.borderValueColor:this.borderColor),
					//color:this.text.length>index?this.borderValueColor:this.borderColor
				};
			},
			initInput(){
				if(this.autofocus)
				this.focus=true;
				// #ifdef H5
				this.$refs.vcodeInput.$refs.input.setAttribute('type','number');
				this.$refs.vcodeInput.$refs.input.setAttribute('pattern','[0-9]*')
				// #endif
			},
			setBlur(){
				this.$nextTick(() => {
					this.focus=false;
				})
			},
			setFocus(){
				this.focus=true;
			},
			clearValue(){
				this.value='';
			}
		}
	}
</script>

<style lang="scss" scoped>
.vcode-input-body{
	// margin-left: -36rpx;
	// margin-right: -36rpx;
	position: relative;
	overflow: hidden;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.vcode-input-item{
	width: 50rpx;
	height: 50rpx;
	margin-right: 10rpx;
	line-height: 50rpx;
	text-align: center;
	font-weight: 500;
}
.vcode-input-border{
	border-style: solid;
	border-width: 2rpx;
	border-color: $uni-border-color;
	border-radius: 4rpx;
}
.vcode-input-line{
	border-bottom-style: solid;
	border-bottom-width: 2rpx;
	border-color: $uni-border-color;
}
.hidden-input{
	width: 1px;
	height: 1px;
	position: absolute;
	left: -1px;
	top: -1px;
	overflow: hidden;
}
</style>
