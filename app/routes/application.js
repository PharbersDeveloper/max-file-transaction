import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
	cookies: service(),
    oauth_service: service(),
	model() {
		let token = this.get('cookies').read('token');
		if(token != undefined && token != null && token != '') {
			window.console.log("test token is get");
		} else {
			if(this.oauth_service.haveAuth) {
                //表示没有登陆直接进入如file某一个页面
				this.transitionTo('index');

			} else {
                //表示进入index和callback页面
			}
		}
	}
});
