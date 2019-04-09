import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';

export default Controller.extend({
	upload_service: service(),
	toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
	bmOss: service(),
	isRefresh: false,
	files: computed('isRefresh', function()	{
		return this.store.query('file', { 'accept': localStorage.getItem("account")})
	}),

	actions: {
		uploadFile(event) {
			console.log(event);
			let that = this,
				file = event["target"].files[0],
				formData = new FormData();
				
				formData.append('file', file);
				window.console.log(file);
			if(file.size > 0) {
				that.upload_service.uploadFile(formData)
				.then(res => {
					that.toast.success('', '上传成功', that.toastOptions);
					that.toggleProperty("isRefresh")
					window.console.log("upload result "+res)	
				})
				.catch(err => {
					that.toast.error('', '上传失败', that.toastOptions);
					window.console.log("upload error "+err)
				})
			} else {
				that.toast.error('', '获取图片失败', that.toastOptions);
				window.console.log("get file error")
			}
		},
		
		download(param) {
			let accept = param.accept;
			let uuid = param.uuid;
			let client = this.bmOss.get('ossClient');
			// let url = client.signatureUrl(accept+uuid);

		}
	},
});
