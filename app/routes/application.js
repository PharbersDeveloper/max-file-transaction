import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
    token: service(),
    beforeModel(transition) {
		window.console.log(transition);
		if (this.token.isTokenValidata()) {
			// this.transitionTo('inbox');
		} else {
			this.transitionTo('index');
		}
	},
});
