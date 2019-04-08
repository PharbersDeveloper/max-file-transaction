import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	upload_service: service(),

	
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
		
	},
});
