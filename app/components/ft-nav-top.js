import Component from '@ember/component';

export default Component.extend({
    actions: {
        exit() {
            this.exitSystem();
        }
    }
});
