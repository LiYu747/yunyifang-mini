// const baseUrl = 'http://192.168.0.105:8765';
const baseUrl = 'http://cev.liephipps.com';
export default function request(url,data,method='GET'){
	return new Promise((reslove,reject) => {
		uni.request({
			url: baseUrl + url,
			data,
			method,
			header: {
				token: ''
			},
			timeout: 5000,
			success(res){
				reslove(res)
			},
			fail(err){
				reject(err)
			}
		})
	})
}