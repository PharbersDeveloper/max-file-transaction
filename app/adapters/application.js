import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default DS.JSONAPIAdapter.extend({
    cookies: service(),

    // init() {
    //     this._super(...arguments)
    //     this.addObserver(this.cookies.read("token"), this, 'tokenChanges')
    // },
    //
    // tokenChanges() {
    //     this.set('headers', {
    //         'Authorization': this.cookies.read("token_type") + ' ' + this.cookies.read("token")//token验证，需要时揭开注释
    //     })
    // },
    headers: computed(function() {
        return {
            'Authorization': this.cookies.read("token_type") + ' ' + this.cookies.read("token")
        };
    }),

    namespace: "v2", // 根据后端发布版本修改命名空间
});
