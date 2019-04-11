import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
    // token: service(),
    cookies: service(),
    model() {
		if (this.get('cookies').read('token')) {
			// this.transitionTo('inbox');
		} else {
			this.transitionTo('index');
		}
	},
});
