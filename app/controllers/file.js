import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	upload_service: service(),


	bmOss: service(),
	actions: {
		uploadFile(event) {
			let that = this,
				file = event["target"].files[0],
				formData = new FormData();

				formData.append('file', file);
				window.console.log(file);
			if(file.size > 0) {
				that.upload_service.uploadFile(formData)
				.then(res => {
					window.console.log("upload result "+res)
				})
				.catch(err => {
					window.console.log("upload error "+err)
				})
			} else {
				window.console.log("get file error")
			}
		},

		download(param) {
			let accept = param.accept;
			let uuid = param.uuid;
			let client = this.bmOss.get('ossClient');
			let url = client.signatureUrl(accept+uuid);

		    var a = document.createElement('a');
		    a.download = param.name;
			a.style.display = 'none';
			var blob = new Blob([url]);
		    a.href = URL.createObjectURL(blob);
		    document.body.appendChild(a);
		    a.click();
			document.body.removeChild(a);

		}
	},
});
