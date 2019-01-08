import Vue from 'vue'
import Vuex from 'vuex'
import log from 'electron-log'
import modules from './modules'

Vue.use(Vuex)

const logger = store => { // 日志(鸡肋)
  store.subscribe((mutation, state) => {
    let descible = JSON.stringify(mutation.payload)
    if (descible.length > 150) {
      descible = descible.substring(0, 150) + '...'
    }
    log.info(`>>${mutation.type}<< | state: ${descible}`)
  })
}

export default new Vuex.Store({
  modules,
  plugins: [logger],
  strict: process.env.NODE_ENV !== 'production'
})
