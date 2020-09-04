import Vue from 'vue'
import I18n from '@/i18n'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

Vue.config.productionTip = false

const vueI18nExt = I18n.setup();

new Vue({
    i18n: vueI18nExt,
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
