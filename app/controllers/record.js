import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
	bmOss: service(),
	cookies: service(),
	oauth_service: service(),
	upload_service: service(),
	toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
	// token: service(),
	arr: A([{
		ym:'111',
		img: 'http://pharbers-images.oss-cn-beijing.aliyuncs.com/pharbers-max/logo_max.png'}]),
	isRefresh: false,
	files: computed('isRefresh', function()	{
		let scope = this.get('cookies').read('scope');
		let accept;
		if(scope.indexOf('/') == -1) {
			accept = scope.toLowerCase();
		} else {
			accept = scope.split(':')[1].replace(/[[\]]/g,"").toLowerCase();
		}
		return this.store.query('file', { 'accept': accept})
	}),
	downloadURI(url, name) {
		fetch(url).then(response => {
			if( response.status == 200 )
                return response.blob()
            throw new Error(`status: ${response.status}`)
		}).then(blob => {
				var link = document.createElement("a");
				link.download = name;
				// var blob = new Blob([response]);
				link.href =  URL.createObjectURL(blob);
				// link.href = url;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				// delete link;
		}).catch(error=> {
			window.console.log("failed. cause:", error)
		})
	},
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

		back() {
			this.transitionToRoute('file');
		},
		download(param) {

			let accept = param.accept;
			let uuid = param.uuid;
			let client = this.bmOss.get('ossClient');
			let url = client.signatureUrl(accept + '/' + uuid);
			window.console.log(url)

			this.downloadURI(url, param.name)
		},
		linkToRecord() {
			this.transitionToRoute('record');
		}
	},
});
