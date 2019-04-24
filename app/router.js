import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import Route from '@ember/routing/route';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Route.reopen({
  withLayout: true,
  setupController() {
      this._super(...arguments);
      this.controllerFor('application').set('showNavbar', this.get('withLayout'));
  }
})

Router.map(function() {
  this.route('file');
  this.route('oauth-callback');
  this.route('record');
});

export default Router;
