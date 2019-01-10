import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { remote, app } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
  if (!fs.existsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
  }
}
const defaultData = {
  todos: [],
  dones: {},
  todosCount: 0,
  setting: {
    todo: {
      'hasTodoTag': true,
      'todoTags': []
    }
  },
  window: {
    data: {
      width: 600,
      height: 450,
      x: null,
      y: null
    },
    isMax: false
  }
}
let isFirst = !fs.existsSync(path.join(STORE_PATH, '/data2.json'))
const adapter = new FileSync(path.join(STORE_PATH, '/data2.json'))
const db = Datastore(adapter)
if (isFirst) { // 第一次使用时进行数据初始化
  db.defaults(defaultData).write()
}
export default db.read()
