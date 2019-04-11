import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
    // token: service(),
	cookies: service(),
	model() {
		let token = this.get('cookies').read('token');
		window.console.log("in the application " + token);
		if(token != undefined && token != null) {
			window.console.log("test token is get");
		} else {
			window.console.log("test token is empty");
			if(localStorage.getItem('isRedirect') == 'false') {
				//表示进入index和callback页面
			} else {
				//表示没有登陆直接进入如file某一个页面
				this.transitionTo('index');
			}
		}
	}
    // model() {
	// 	if (this.get('cookies').read('token')) {
	// 		// this.transitionTo('inbox');
	// 	} else {
	// 		//window.console("test the error");
	// 		//this.transitionTo('index');
	// 	}
	// },
});
