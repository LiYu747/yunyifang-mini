<template>
	<view>
		<visitMsg title="我的历史访客" :msg="arr.myVisit" type=1></visitMsg>
		<visitMsg title="我的历史拜访" :msg="arr.myVisited" type=2></visitMsg>
	</view>
</template>

<script>
		import { INTERVIEWEE_STATUS } from '@/utils/constant'
	export default {
		data() {
			return {
				arr:{}
			}
		},
		methods: {
		 	 async getData(id) {
				const res = await this.$api.historicalVisitors(id)
				res.data.myVisit.map( item => {
					item.intervieweeStatus = INTERVIEWEE_STATUS[item.intervieweeStatus];
					item.intervieweeStartTime = item.intervieweeStartTime.slice(0,16)
					item.intervieweeEndTime = item.intervieweeEndTime.slice(11,16)
					item.visitTime = item.intervieweeStartTime + ' - ' + item.intervieweeEndTime
				})
				res.data.myVisited.map(item => {
					item.intervieweeStatus = INTERVIEWEE_STATUS[item.intervieweeStatus];
					item.intervieweeStartTime = item.intervieweeStartTime.slice(0,16)
					item.intervieweeEndTime = item.intervieweeEndTime.slice(11,16)
					item.visitTime = item.intervieweeStartTime + ' - ' + item.intervieweeEndTime
				})
				this.arr = res.data
			}
		},
		onLoad(val) {
			this.getData(val.id)
		}
	}
</script>

<style>

</style>
