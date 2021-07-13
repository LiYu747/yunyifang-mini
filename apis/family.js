import http from '@/utils/http';

export default {
	login(data) {
		return http.post('/api/user/login', data);
	},
	addPatient(data) {
		return http.post('/wx/patient/add', data);
	},
	getAllPatients() {
		return http.get('/wx/patient/list?type=1');
	},
	getPatients() {
		return http.get('/wx/patient/list?type=2');
	},
	removePatient(id) {
		return http.delete(`/wx/patient/deleteBatch?ids=${id}`);
	},
	setDefaultPatient(id) {
		return http.post(`/wx/patient/setDefault?id=${id}`);
	},
	// 预约探视-查询最近一周的排班
	getLatestWeek() {
		return http.get('/wx/family/getLatestWeek');
	},
	// 家属预约探视探视时间单价列表
	getLatestPrice() {
		return http.get('/wx/family/getVistTimePriceList');
	},
	// 预约探视
	appointment(data) {
		return http.post('/wx/family/appointment', data);
	},
	// 家属查看预约探视 orderStatus(0待审核，1已审核，3已完成)
	getApplyView(orderStatus) {
		return http.get('/wx/family/orderList', { params: { orderStatus } });
	},
	getLatestAudit() {
		return http.get('/wx/family/getLatestOrder');
	},
	getCamera(oid) {
		return http.get(`/wx/family/getCamera?id=${oid}`);
	},
	skewCamera({ cameraId, direction }) {
		// direction(1 - 上 2 - 下 3 - 左 4 - 右)
		return http.get(`/wx/family/cameraSwivel?id=${cameraId}&cmd=${direction}`, { custom: { loading: false } });
	},
	// 获取订单详情
	getOrderInfo(id) {
		return http.get(`/wx/family/orderInfo?oid=${id}`);
	},
	// 申请退款
	requestRefund(data) {
		return http.post('/wx/family/requestRefund', data);
	},
	// 取消申请退款
	cancelRefund(id) {
		return http.get(`/wx/family/cancelRefund?visitOrderId=${id}`);
	},
	// 获取病人信息
	patientDetail(id) {
		return http.get(`/wx/patient/info?id=${id}`);
	},
	// 关闭订单
	closeOrder(params) {
		return http.get('/wx/family/closeOrder', { params });
	},
	refundCheck(id){
		return http.get(`/wx/family/refundCheck?visitOrderId=${id}`);
	},
	setOnlineByFamily(oid, status){
		return http.get(`/wx/family/setOnline?oid=${oid}&status=${status}`);
	},
	// 获取微信支付参数
	visitOrderPay(data) {
		return http.post('/wx/family/visitOrderPay', data);
	}
}
