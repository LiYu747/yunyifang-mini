const baseUrl = 'dadaddsadadasd';
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