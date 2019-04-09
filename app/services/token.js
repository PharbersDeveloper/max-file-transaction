import Service from '@ember/service';
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
const { keys } = Object;

export default Service.extend({
    cookies: service(),

    init() {
        this._super(...arguments)
        this.set('allCookies', this.refreshCookies())
    },

    token: computed('allCookies', function(){``
        let value = ''
        for (let idx = 0; idx < this.allCookies.length; idx++) {
            let tmp = this.allCookies[idx]
            if (tmp.name == 'token') {
                value = tmp.value
            } 
        }

        if (value.length > 0) {
            localStorage.setItem('token', value)
        } 
        return value
    }),

    bearerToken: computed('token', function(){
        return 'bearer ' + localStorage.getItem('token')
    }),

    resetData(t) {
        this.set('token', t)
        this.cookies.write('token', t) // TODO: add options
        localStorage.setItem('token', t)
        this.refreshCookies()
    },

    clearToken() {
        this.set('token', '')
        this.cookies.clear("token")
        this.cookies.clear("now")
    },

    clearAllCache() {
        localStorage.clear();
        this.clearToken();
    },

    isTokenValidata() {
        return this.token.length > 0
    },

    refreshCookies() {
        let cookieService = this.get('cookies');
        cookieService.write('now', new Date().getTime());
    
        let cookies = cookieService.read();

        return keys(cookies).reduce((acc, key) => {
            let value = cookies[key];
            acc.push({ name: key, value });
    
            return acc;
        }, [])
        // return cookies;
    }
});
