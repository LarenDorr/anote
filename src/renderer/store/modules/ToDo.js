const state = {
  todos: [], // 存放所有未完成的待办
  dones: [] // 存放今日完成的待办
}
const mutations = {
  addItem (state, item) { // 添加todo
    state.todos.push(item)
  },
  changeItem (state, {item, prop}) {
    let rules = {
      'content' () {
        state.todos.forEach(e => {
          if (e.key === item.key) {
            e[prop] = item[prop]
          }
        })
      },
      'top' () {
        state.todos = state.todos.filter(e => e.key !== item.key)
        if (item.top === true) {
          state.todos.unshift(item)
        } else {
          state.todos.push(item)
        }
      },
      'status' () {
        if (item.status === true) {
          state.todos = state.todos.filter(e => e.key !== item.key)
          state.dones.push(item)
        } else {
          state.dones = state.dones.filter(e => e.key !== item.key)
          state.todos.push(item)
        }
      }
    }
    rules[prop]()
  },
  deleteItem (state, key) {
    state.todos = state.todos.filter(item => item.key !== key)
    state.dones = state.dones.filter(item => item.key !== key)
  },
  initData (state, data) {
    state.todos = data.todos
    state.dones = data.dones
  }
}
const getters = {
}

export default {
  state,
  mutations,
  getters
}
