import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({
	uploadFile(file) {
		return new Promise(function(resolve, reject){
			$.ajax({
				method: 'POST',
				url: '/v2/UploadToOss?accept=nhwa&des=前端测试',
				data: file,
				processData: false,
				contentType: false,
                success: function(res) {
					window.console.log(res);
                    return new Promise(function(){
                        if (res.status == 'error') {
                            reject(res.error)
                        } else {
                            resolve(res.result)
                        }
                    })
                },
                error: function(err) {
					window.console.log(err)
                    reject(err)
                },
			})
		})
		
	},
});
