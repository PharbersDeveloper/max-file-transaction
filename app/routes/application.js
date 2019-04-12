import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
	cookies: service(),
	model() {
		let token = this.get('cookies').read('token');
		if(token != undefined && token != null && token != '') {
			window.console.log("test token is get");
		} else {
			if(localStorage.getItem('needRedirect') == 'false') {
                // 跳转到授权页
			} else {
				this.transitionTo('index');
			}
		}
	}
});
