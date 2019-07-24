import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use({
  install (Vue) {
    Vue.prototype.$genesis = axios.create({
      baseURL: 'https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN',
      headers: { key: "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt"}
    })
  }
})

Vue.use(Vuetify)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
