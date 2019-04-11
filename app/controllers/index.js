import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
	cookies: service(),
	clientId: '5caeafd7d23dc2064f4891ba', // 5cac3206d23dc25e3bbb1ffe
	clientSecret: '5c90db71eeefcc082c0823b2',
	redirectUri: 'http://192.168.200.200:4200/oauth-callback',
	beforeModel({ targetName }) {
		let cookies = this.get('cookies'),
			token = cookies.read('token');

		if (!token && targetName !== 'oauth-callback') {
			let host = 'http://192.168.100.116:31416',
				version = 'v0',
				resource = 'GenerateUserAgent',
				scope = 'Pharbers',
				url = '';

			url = `?response_type=code
                        &client_id=${this.get('clientId')}
                        &client_secret=${this.get('clientSecret')}
                        &scope=${scope}
						&redirect_uri=${this.get('redirectUri')}`.
				replace(/\n/gm, '').
				replace(/ /gm, '').
				replace(/\t/gm, '');
			window.location = [host, version, resource, url].join('/');
		} else {
            this.transitionTo("file")
        }
	}
    // login_service: service(),
    // token: service(),
    // toast: service(),
    // toastOptions: EmberObject.create({
    //     closeButton: false,
    //     positionClass: 'toast-top-center',
    //     progressBar: false,
    //     timeOut: '2000',
    // }),
    // errorInfo: false,
    // account: '',
    // password: '',
    // actions: {
    //     accountLogin() {
    //         // this.toast.success('', '登陆成功', this.toastOptions);
    //         // this.transitionToRoute('file');
    //         let that = this
    //         this.login_service.accountLogin(this.account, this.password).then(res => {
    //             that.token.resetData(res['token'])
    //             that.set('errorInfo', false);
    //             // return that.store.find('brands', that.token.brandId) // TODO: 缓存机制
    //             localStorage.setItem('account', res.account);
	// 			that.toast.success('', '登陆成功', that.toastOptions);
	// 			that.set('account', '');
	// 			that.set('password', '');
    //             that.transitionToRoute('file');
    //         }).catch(() => {
    //             // TODO: 错误处理
    //             that.set('errorInfo', true);
    //             that.toast.error('', '登陆失败', that.toastOptions);
    //         })
    //     }
    // },
});
