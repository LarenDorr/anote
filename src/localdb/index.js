import db from './datastore'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export default {
  getTodosCount () {
    let count = db.get('todosCount').value()
    return count
  },
  setTodosCount (count) {
    db.set('todosCount', count).write()
  },
  getTodos () {
    let todos = db.get('todos').value()
    return todos
  },
  setTodos (todos) {
    if (todos) {
      db.set('todos', todos).write()
    }
  },
  getDones (date = dayjs().format('YYYYMMDD')) {
    let dones = db.get(`dones.d${date}`).value() || []
    return dones
  },
  getAllDones () {
    let allDones = db.get('dones').value()
    return allDones
  },
  setDones (dones, date = dayjs().format('YYYYMMDD')) {
    let today = dayjs().date()
    dones = dones.filter(done => dayjs.unix(done.doneDate).date() === today)
    db.set(`dones.d${date}`, dones).write()
  },
  getSetting () {
    let setting = db.get('setting').value()
    return setting
  },
  setSetting (setting) {
    db.set('setting', setting).write()
  },
  getWindowData () {
    return db.get('window.data').value()
  },
  setWindowData (data) {
    db.set('window.data', data).write()
  },
  getWindowIsMax () {
    return db.get('window.isMax').value()
  },
  setWindowIsMax (isMax) {
    db.set('window.isMax', isMax).write()
  }
}
