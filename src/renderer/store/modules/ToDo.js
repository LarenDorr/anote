const state = {
  todayItems: []
}
const mutations = {
  addItem (state, item) {
    state.todayItems.push(item)
  },
  changeItem (state, {item, prop}) {
    state.todayItems.forEach(e => {
      if (e.key === item.key) {
        e[prop] = item[prop]
        e.doneDate = item.doneDate
      }
    })
    // handle top change
    state.todayItems = state.todayItems.filter(e => e.key !== item.key)
    if (item.top === true) {
      state.todayItems.unshift(item)
    } else {
      state.todayItems.push(item)
    }
  },
  deleteItem (state, key) {
    let items = state.todayItems
    state.todayItems = items.filter(item => item.key !== key)
  },
  initData (state, data) {
    state.todayItems = data
  }
}
const getters = {
  toDoList: state => {
    return state.todayItems.filter(e => !e.status)
  },
  doneList: state => {
    return state.todayItems.filter(e => e.status)
  }
}

export default {
  state,
  mutations,
  getters
}
