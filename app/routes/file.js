import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            files: this.store.query('file', { 'accept': localStorage.getItem("account")})
        })
    }
});
