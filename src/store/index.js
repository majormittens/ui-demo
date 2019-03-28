import Vue from 'vue'
import Vuex from 'vuex'
import orderbook from './modules/orderbook'
import ticker from './modules/ticker'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    orderbook,
    ticker
  },
  getters
})

export default store
