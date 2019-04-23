import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    cookies: service(),
    ajax: service(),
    router: service(),

    version: 'v0',
    clientId: "5cbdac9bf4ce4352ecb082a2",
    clientSecret: '5c90db71eeefcc082c0823b2',
    status: "self",
    redirectUri: 'http://report.pharbers.com:4201/oauth-callback',
    host: 'http://192.168.100.116:9097',
    scope: "APP/FileUpAndDownLoad",
    // redirectUri: 'http://192.168.0.100:4201/oauth-callback',
    // host: 'http://oauth.pharbers.com',
    // scope: "APP/FileUpAndDownLoad",

    oauthOperation() {
        const ajax = this.get('ajax')
        let host = `${this.get('host')}`,
            version = `${this.get('version')}`,
            resource = 'ThirdParty',
            url = '';

        url = `?client_id=${this.get('clientId')}
                    &client_secret=${this.get('clientSecret')}
                    &scope=${this.get('scope')}
                    &status=${this.get('status')}
                    &redirect_uri=${this.get('redirectUri')}`.
            replace(/\n/gm, '').
            replace(/ /gm, '').
            replace(/\t/gm, '');
        return ajax.request([host, version, resource, url].join('/'), {
            dataType: 'text'
            }).then(response => {
                return response;
            })
            .catch(err => {
                window.console.log('error');
                window.console.log(err);
            })
        // window.location = [host, version, resource, url].join('/');
    },

    oauthCallback(transition) {
        let version = `${this.get('version')}`,
            host = `${this.get('host')}`,
			resource = 'GenerateAccessToken',
			url = '',
			cookies = this.get('cookies');

		const ajax = this.get('ajax'),
			{ queryParams } = transition;

		if (queryParams.code && queryParams.state) {
			url = `?client_id=${this.get('clientId')}
					&client_secret=${this.get('clientSecret')}
					&scope=${this.get('scope')}
					&redirect_uri=${this.get('redirectUri')}
					&code=${queryParams.code}
					&state=${queryParams.state}`.
				replace(/\n/gm, '').
				replace(/ /gm, '').
				replace(/\t/gm, '');
			ajax.request([host, version, resource, url].join('/'))
				.then(response => {
                    let expiry = new Date(response.expiry);
                    let options = {
                        domain: '.pharbers.com',
                        path: '/',
                        expires: expiry
                    }
                    cookies.write('token', response.access_token, options);
					cookies.write('account_id', response.account_id, options);
					cookies.write('access_token', response.access_token, options);
					cookies.write('refresh_token', response.refresh_token, options);
                    cookies.write('token_type', response.token_type, options);
                    cookies.write('scope', response.scope, options);
                    cookies.write('expiry', response.expiry, options);
					this.get('router').transitionTo('file');
				});
		} else {
			this.get('router').transitionTo('file');
		}
    },

    judgeAuth() {
        let tokenFlag = false;
        let scopeFlag = false;
		let token = this.get('cookies').read('token');
		let scope = this.get('cookies').read('scope');
		
		if(token != undefined && token != null && token != '') {
            window.console.log("have token");
            tokenFlag = true;
		} else {
            window.console.log("no token!");
		}

		if(scope != undefined && scope != null && scope != '') {
			let result = scope.split("/")

			if(result == null || result.length < 2) {
				window.console.log("scope do not contained current project!");
			} else {
                let scopes = result[1].split(":")
                scopes.forEach(elem => {
                    if(elem === "FileUpAndDownLoad") {
                        window.console.log("scope contained current project");
                        scopeFlag = true;
                    } else {
                        window.console.log("scope do not contained current project!");
                    }
                })
            }
        } else {
            window.console.log("no scope!");
        }
        
        if(tokenFlag && scopeFlag) {
            return true;
		} else {
            return false;
        }
	},

    removeAuth() {
        let options = {
            domain: '.pharbers.com',
            path: '/',
        }
        this.cookies.clear("token", options)
        this.cookies.clear("account_id", options)
        this.cookies.clear("access_token", options)
        this.cookies.clear("refresh_token", options)
        this.cookies.clear("token_type", options)
        this.cookies.clear("scope", options)
        this.cookies.clear("expiry", options)
        window.console.log("clear cookies!");
    },

});
