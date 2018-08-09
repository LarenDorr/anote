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
      }
    })
  },
  deleteItem (state, key) {
    let items = state.todayItems
    state.todayItems = items.filter(item => item.key !== key)
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
