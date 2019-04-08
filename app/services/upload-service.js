import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({
	uploadFile(file) {
		//console.log("in the service: " + file.length);
		console.log("%%%%%%%")
		//let dt = JSON.stringify(file);
		return new Promise(function(resolve, reject){
			console.log("^^^^^^^^")
			$.ajax({
				method: 'POST',
				url: '/v2/UploadToOss?accept=nhwa&des=前端测试',
				data: file,
				processData: false,
				contentType: false,
                success: function(res) {
					console.log(res);
                    return new Promise(function(){
                        if (res.status == 'error') {
                            reject(res.error)
                        } else {
                            resolve(res.result)
                        }
                    })
                },
                error: function(err) {
					console.log(err)
                    reject(err)
                },
			})
		})
		
	},
});
