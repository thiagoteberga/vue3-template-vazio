import { createApp } from 'vue'
import { createStore } from 'vuex'
import mutations from './mutations'
import getters from './getters'

/*
https://next.vuex.vuejs.org/installation.html#direct-download-cdn
https://next.vuex.vuejs.org/guide/#the-simplest-store
*/

const app = createApp({ createApp })
app.use(createStoreVuex)

export function createStoreVuex () {

  return new createStore({
    state:{
        usuario: localStorage.getItem('usuarioLogadoSessao') ? JSON.parse(localStorage.getItem('usuarioLogadoSessao')) : null
      },    
    mutations,
    getters
  })
}