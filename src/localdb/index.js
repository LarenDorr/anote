import db from './datastore'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const defaultData = {
  todos: [],
  dones: [],
  todosCount: 0,
  setting: {
    todo: {
      'hasTodoTag': true,
      'todoTags': []
    }
  }
}

export default {
  getTodosCount () {
    let count = db.get('todosCount').value() || defaultData.todosCount
    return count
  },
  setTodosCount (count) {
    db.set('todosCount', count).write()
  },
  getTodos () {
    let todos = db.get('todos').value() || defaultData.todos
    return todos
  },
  setTodos (todos) {
    if (todos) {
      db.set('todos', todos).write()
    }
  },
  getDones (date = dayjs().format('YYYYMMDD')) {
    let dones = db.get(`dones.d${date}`).value() || defaultData.dones
    return dones
  },
  getAllDones () {
    let allDones = db.get('dones').value() || {}
    return allDones
  },
  setDones (dones, date = dayjs().format('YYYYMMDD')) {
    let today = dayjs().date()
    dones = dones.filter(done => dayjs.unix(done.doneDate).date() === today)
    db.set(`dones.d${date}`, dones).write()
  },
  getSetting () {
    let setting = db.get('setting').value() || defaultData.setting
    return setting
  },
  setSetting (setting) {
    db.set('setting', setting).write()
  }
}
