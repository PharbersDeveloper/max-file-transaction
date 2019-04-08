import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default Controller.extend({
    login_service: service(),
    token: service(),
    toast: service(),
    toastOptions: EmberObject.create({
        closeButton: false,
        positionClass: 'toast-top-center',
        progressBar: false,
        timeOut: '2000',
    }),
    errorInfo: false,
    account: '',
    password: '',
    actions: {
        accountLogin() {
			console.log("test"+this.account)
            this.toast.success('', '登陆成功', this.toastOptions);
            this.transitionToRoute('file');
            // let that = this
            // this.login_service.accountLogin(this.account, this.password).then(res => {
            //     that.token.resetData(res['token'])
            //     that.set('errorInfo', false);
            //     // return that.store.find('brands', that.token.brandId) // TODO: 缓存机制
            //     that.toast.success('', '登陆成功', that.toastOptions);
            //     that.transitionToRoute('file');
            // }).catch(() => {
            //     // TODO: 错误处理  
            //     that.set('errorInfo', true);
            //     that.toast.error('', '登陆失败', that.toastOptions);
            // })
        }
    },
});