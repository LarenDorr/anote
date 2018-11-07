import Vue from 'vue'
import Vuex from 'vuex'
import log from 'electron-log'
import modules from './modules'
// import db from 'src/localdb'

Vue.use(Vuex)

const logger = store => {
  store.subscribe((mutation, state) => {
    let descible = JSON.stringify(mutation.payload)
    if (descible.length > 150) {
      descible = descible.substring(0, 150) + '...'
    }
    log.info(`>>${mutation.type}<< | state: ${descible}`)
  })
}
const saveToDB = store => {
  store.subscribe((mutation, state) => {
    let avoidList = ['initData', 'initSetting']
    if (!avoidList.includes(mutation.type)) {
      // console.log(state)
      // db.saveAll(state)
    }
  })
}
export default new Vuex.Store({
  modules,
  plugins: [logger, saveToDB],
  strict: process.env.NODE_ENV !== 'production'
})
