import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    oauthService: service(),
    
    actions: {
        exit() {
            this.exitSystem();
        }
    }
});
