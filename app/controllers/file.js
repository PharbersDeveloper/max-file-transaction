import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	upload_service: service(),

	
	bmOss: service(),
	actions: {
		uploadFile(event) {
			console.log(event);
			let that = this,
				file = event["target"].files[0],
				formData = new FormData();

				formData.append('file', file);
				//reader = new FileReader();
				console.log(file);
			if(file.size > 0) {
				that.upload_service.uploadFile(formData)
				.then(res => {
					console.log("upload result "+res)	
				})
				.catch(err => {
					console.log("upload error "+err)
				})
			} else {
				console.log("get file error")
			}
		},
		
		uploadFile() {
			// var input = document.getElementById("file");
			// var file = input.files[0];
			// console.log("111"+file);
		},
		download(param) {
			let accept = param.accept;
			let uuid = param.uuid;
			let client = this.bmOss.get('ossClient');
			// let url = client.signatureUrl(accept+uuid);

		}
	},
});
