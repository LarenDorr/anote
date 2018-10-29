import { getField, updateField } from 'vuex-map-fields'
const state = {
  todo: {},
  note: {},
  log: {}
}
const mutations = {
  initSetting (state, data) {
    state.todo = data.todo
    state.note = data.note
    state.log = data.log
  },
  changeTags (state, data) {
    state.todo.todoTags = data
  },
  updateField
}
const getters = {
  getField
}

export default {
  state,
  mutations,
  getters
}
