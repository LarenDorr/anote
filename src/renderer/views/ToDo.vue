<template>
  <div class="to-do ">
    <div class="md-content todo">
      <NewToDo
        :newToDo="newToDo"
        :onClear="clearNewTodo"
        :setting="todoSetting"
        :onAddTodo="addTodo"
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
import db from 'src/localdb'
export default {
  data () {
    return {
      newToDo: { // 新创建的todo
        status: false, // 是否完成
        content: '', // 具体内容
        initDate: '', // 创建日期
        doneDate: '', // 完成日期
        key: '', // todo唯一key
        top: false, // 是否置顶
        tag: '' // 标签
      }
    }
  },
  computed: {
    ...mapState({
      'todos': state => state.ToDo.todos, // 待完成的todos
      'dones': state => state.ToDo.dones, // 今日完成的todos
      'todoSetting': state => state.Setting.todo // 相关的todo设置项
    })
  },
  watch: {
    todos () {
      this.putData()
    },
    dones () {
      this.putData()
    }
  },
  methods: {
    handleChange (item) {
      let prop = this.diffChange(item)
      if (!prop) {
        return
      }
      const addition = { // 不同类型的附加操作
        content: () => {
        },
        status: () => { // top属性置为默认值, 添加或清除完成日期
          if (item.status === true) {
            item.doneDate = this.$dayjs().unix()
            item.top = false
          } else {
            item.doneDate = ''
          }
        },
        top: () => {
        }
      }
      addition[prop]()
      this.changeItem({
        item: item,
        prop: prop
      })
    },
    handleDelete (item) {
      this.deleteItem(item.key)
    },
    diffChange (item) { // 获取改变的属性名
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
    addTodo () {
      if (this.newToDo.content === '') return
      // 设置newTodo key
      let count = db.getTodosCount()
      this.newToDo.key = count++
      let itemTmp = Object.assign({}, this.newToDo)
      itemTmp.initDate = this.$dayjs().unix()
      this.addItem(itemTmp)
      this.clearNewTodo()
      db.setTodosCount(count)
    },
    clearNewTodo () {
      this.newToDo.tag = ''
      this.newToDo.content = ''
    },
    putData () { // 存储数据
      db.setTodos(this.todos)
      db.setDones(this.dones)
    },
    getData () { // 获取数据
      let todos = db.getTodos()
      let dones = db.getDones()
      return {todos, dones}
    },
    ...mapMutations([
      'addItem',
      'changeItem',
      'deleteItem'
    ])
  },
  updated () {
    this.putData() // 存储vuex中数据至db
  },
  mounted () {
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
