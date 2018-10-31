<template>
  <div class="to-do ">
    <div class="md-content todo">
      <NewToDo
        :newToDo="newToDo"
        :addToDo="addToDo"
        :setting="todoSetting"
        class="todo-new"
      ></NewToDo>
      <ToDoList
        :toDoList="todos"
        :doneList="dones"
        :handleChange="handleChange"
        :handleDelete="handleDelete"
        class="todo-list"
      ></ToDoList>
    </div>
    <!-- <div class="md-content graph">graph</div> -->
  </div>
</template>
<script>
import NewToDo from '@/components/ToDo/NewToDo'
import ToDoList from '@/components/ToDo/ToDoList'
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      newToDo: {
        status: false,
        content: '',
        initDate: '',
        doneDate: '',
        key: '',
        top: false,
        tag: ''
      }
    }
  },
  computed: {
    ...mapState({
      'todos': state => state.ToDo.todos,
      'dones': state => state.ToDo.dones,
      'todoSetting': state => state.Setting.todo
    })
  },
  methods: {
    handleChange (item) {
      let prop = this.diffChange(item)
      if (prop === undefined) {
        return
      }
      const rules = { // 使用对象来代替if-else
        content: () => {
          this.changeItem({
            item: item,
            prop: prop
          })
        },
        status: () => {
          if (item.status === true) {
            item.doneDate = this.$dayjs().unix()
            item.top = false
          } else {
            item.doneDate = ''
          }
          this.changeItem({
            item: item,
            prop: prop
          })
        },
        top: () => {
          this.changeItem({
            item: item,
            prop: prop
          })
        }
      }
      rules[prop]()
    },
    handleDelete (item) {
      this.deleteItem(item.key)
    },
    diffChange (item) { // 获取改变的属性name
      let oldVal
      let all = this.todos.concat(this.dones)
      all.forEach(e => {
        if (e.key === item.key) {
          oldVal = e
        }
      })
      for (let prop in oldVal) {
        if (oldVal[prop] !== item[prop]) {
          return prop
        }
      }
    },
    getIndex (key) {
      let n = 0
      for (const e of this.todos) {
        if (e.key === key) {
          return n
        }
        n++
      }
      n = 0
      for (const e of this.dones) {
        if (e.key === key) {
          return n
        }
        n++
      }
    },
    addToDo () {
      if (this.newToDo.content === '') return
      let count = this.$db.get('todosCount').value() || 0
      this.newToDo.key = count++
      let itemTmp = Object.assign({}, this.newToDo)
      itemTmp.initDate = this.$dayjs().unix()
      this.addItem(itemTmp)
      this.newToDo.content = ''
      this.newToDo.tag = ''
      this.$db.set('todosCount', count).write()
    },
    putData () {
      let db = this.$db
      let today = this.$dayjs().format('YYYYMMDD')
      db.set('todos', this.todos).write()
      db.set(`dones.d${today}`, this.dones).write()
    },
    getData () {
      let db = this.$db
      let today = this.$dayjs().format('YYYYMMDD')
      let todos = db.get('todos').value() || []
      let dones = db.get(`dones.d${today}`).value() || []
      return {todos, dones}
    },
    ...mapMutations([
      'addItem',
      'changeItem',
      'deleteItem',
      'initData'
    ])
  },
  updated () {
    this.putData() // 存储vuex中数据至db
  },
  mounted () {
    this.initData(this.getData()) // 从db中获取data赋给redux
  },
  components: {
    NewToDo,
    ToDoList
  }
}
</script>
<style>
.to-do{
  width: 100%;
  height: 100%;
}
.to-do > div {
  height: 100%;
}
.todo{
  width: 90%;
  max-width: 800px;
  min-width: 530px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.todo-new{
  height: 20%;
  width: 80%;
  display: flex;
  align-items: center;
}
.todo-list{
  width: 80%;
  height: 80%;
}
.graph{
  width: 30%;
  display: inline-flex;
}
</style>
