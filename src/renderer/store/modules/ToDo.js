const state = {
  todayItems: []
}

const mutations = {
  addItem (state, item) {
    state.todayItems.push(item)
  },
  changeItemStatus (state, item) {
    state.todayItems = state.todayItems.filter(e => e.key !== item.key)
    console.log(state.todayItems)
    state.todayItems.push(item)
  },
  sortItem (items) {
    return items
  },
  deleteItem (state, key) {
    let items = state.todayItems
    state.todayItems = items.filter(item => item.key !== key)
  }
}

const getters = {
  toDoItems: state => {
    return state.todayItems.filter(e => !e.status)
  },
  doneItems: state => {
    return state.todayItems.filter(e => e.status)
  }
}

export default {
  state,
  mutations,
  getters
}
