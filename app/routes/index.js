import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    // beforeModel(/* transition */) {
        // this.transitionTo('home'); // Implicitly aborts the on-going transition.
    // }
    // withLayout: false,
    // model() {
    //     return RSVP.hash({
    //         errorImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/icon_status_error%402x.png'
    //     });
	// },
	cookies: service(),
	clientId: '5caeb116d23dc2064f4891bb', // 5cac3206d23dc25e3bbb1ffe
	clientSecret: '5c90db71eeefcc082c0823b2',
	redirectUri: 'http://192.168.100.177:4200/oauth-callback',
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
});
