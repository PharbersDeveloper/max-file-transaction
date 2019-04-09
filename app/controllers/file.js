import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	bmOss: service(),
	actions: {
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
