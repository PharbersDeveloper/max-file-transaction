import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
    // beforeModel(/* transition */) {
        // this.transitionTo('home'); // Implicitly aborts the on-going transition.
    // }
    // withLayout: false,
    model() {
        return RSVP.hash({
            errorImg: 'https://bm-web.oss-cn-beijing.aliyuncs.com/icon_status_error%402x.png'
        });
    },
});
