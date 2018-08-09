<template>
  <div class="to-do ">
    <div class="md-content todo ">
      <NewToDo
        :newToDo="newToDo"
        :addToDo="addToDo"
        class="todo-new"
      ></NewToDo>
      <ToDoList
        :toDoList="toDoList"
        :doneList="doneList"
        :handleChange="handleChange"
        class="todo-list"
      ></ToDoList>
    </div>
    <div class="md-content graph">graph</div>
  </div>
</template>
<script>
import NewToDo from '@/components/ToDo/newToDo'
import ToDoList from '@/components/ToDo/ToDoList'
import { mapMutations, mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      newToDo: {
        status: false,
        content: '',
        initDate: '',
        doneDate: '',
        key: '',
        top: false
      }
    }
  },
  computed: {
    ...mapState({
      'Items': state => state.ToDo.todayItems
    }),
    ...mapGetters([
      'toDoList',
      'doneList'
    ])
  },
  methods: {
    handleChange (item) {
      let prop = this.diffChange(item)
      const rules = {
        content: () => {
          console.log('content')
        },
        status: (res) => {
          console.log('status')
          if (item.status === true) {
            this.moveItem(item, 'x', res)
          }
        },
        top: () => {
          console.log('top')
        }
      }
      let p = new Promise((resolve, reject) => {
        rules[prop](resolve)
      })
      p.then(() => {
        this.changeItem({
          item: item,
          prop: prop
        })
      })
    },
    diffChange (item) {
      let oldVal
      this.Items.forEach(e => {
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
    statusChange (item) {
      // let index = this.getIndex(item.key)
      // if (item.status === true) {
      //   from = index
      //   to = this.Items.length
      // } else {
      // }
      // let p = new Promise((resolve, reject) => {
      //   this.moveItem(from, to, resolve) // 添加动画
      // })
      // p.then(() => {
      //   this.commitItemStatus(item)
      //   let arr = [...(document.querySelectorAll('.list-item'))]
      //   console.log(arr)
      //   for (const e of arr) {
      //     e.removeAttribute('style')
      //   }
      // })
      let p = new Promise((resolve, reject) => {
        this.moveItem(item, resolve)
      })
      p.then(() => {
        this.commitItemStatus(item)
      })
    },
    getIndex (item) {
      let items
      if (!item.status) { // 完成列表
        items = this.doneList
      } else {
        items = this.toDoList
      }
      console.log(item, this.toDoList)
      let n = 0
      for (const e of items) {
        if (e.key === item.key) {
          return n
        }
        n++
      }
    },
    moveItem (item, direction, cb) {
      let index = this.getIndex(item) // 获取元素在其列表中的位置
      let element // 变化的节点
      let otherEle // 其他要变化的节点
      let elementLen // 变化节点的运动长度
      let otherEleLen // 其他节点的运动长度
      let tl = this.$anime.timeline()

      if (direction === 'x') { // 当为左右动画时
        if (item.status === true) { // 向右移动
          let elements = document.querySelectorAll('.todo-item')
          console.log(elements)
          element = elements[index]
          otherEle = [...elements].slice(index + 1)
          elementLen = '100px'
        } else { // 向左移动
          let elements = document.querySelectorAll('.done-item')
          element = elements[index]
          otherEle = [...elements].slice(index + 1)
          elementLen = '-100px'
        }
        otherEleLen = '-48px'
        tl.add({
          targets: element,
          translateX: elementLen,
          opacity: 0,
          easing: 'linear',
          offset: 0,
          complete: cb
        }).add({
          targets: otherEle,
          translateY: otherEleLen,
          easing: 'linear',
          offset: 0,
          complete: () => {
            otherEle.forEach(e => {
              e.style.transform = ''
            })
          }
        })
      } else {
      }
      // let index = this.getIndex(item)
      // let element
      // let otherEle
      // let distanceX
      // let distanceY = '-48px'
      // if (item.status) {
      //   let elements = document.querySelectorAll('.todo-item')
      //   element = elements[index]
      //   otherEle = [...elements].slice(index + 1)
      //   distanceX = '100px'
      // } else {
      //   let elements = document.querySelectorAll('.done-item')
      //   element = elements[index]
      //   otherEle = [...elements].slice(index + 1)
      //   distanceX = '-100px'
      // }
      // let tl = this.$anime.timeline()
      // tl.add({
      //   targets: element,
      //   translateX: distanceX,
      //   opacity: 0,
      //   easing: 'linear',
      //   offset: 0,
      //   complete: res
      // }).add({
      //   targets: otherEle,
      //   translateY: distanceY,
      //   easing: 'linear',
      //   offset: 0,
      //   complete: () => {
      //     otherEle.forEach(e => {
      //       e.style.transform = ''
      //     })
      //   }
      // })
    },
    addToDo () {
      if (this.newToDo.content === '') return
      this.newToDo.key = Date.now()
      let itemTmp = Object.assign({}, this.newToDo)
      this.addItem(itemTmp)
      this.newToDo.content = ''
    },
    ...mapMutations([
      'addItem',
      'changeItem'
    ])
  },
  components: {
    NewToDo,
    ToDoList
  }
}
</script>
<style>
.to-do{
  width: 830px;
  height: 100%;
}
.to-do > div {
  height: 100%;
}
.todo{
  width: 530px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.todo-new{
  height: 20%;
  width: 80%;
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
