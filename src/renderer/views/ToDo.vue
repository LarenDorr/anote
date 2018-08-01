<template>
  <div class="to-do ">
    <div class="md-content todo ">
      <div class="new-todo">
        <md-field>
          <!-- <md-icon>fiber_new</md-icon> -->
          <label>Want to do</label>
          <md-input v-model.lazy="newToDo.content" @keyup.enter="addItem" ></md-input>
          <md-button class="md-icon-button" @click="addItem(newToDo)">
            <md-icon>add</md-icon>
          </md-button>
        </md-field>
      </div>
      <md-tabs class="wrap-list md-scrollbar md-theme-default">
        <md-tab id="tab-todo" md-label="待办" to="">
          <md-content class="md-scrollbar list-content">
            <ToDoItem v-for="item in toDoItems" :item="item" :key="item.key" 
            @status-change="statusChange" ></ToDoItem>
          </md-content>
        </md-tab>
        <md-tab id="tab-done" md-label="已办" to="">
          <md-content class="md-scrollbar list-content">
            <ToDoItem v-for="item in doneItems" :item="item" :key="item.key" 
            @status-change="statusChange" ></ToDoItem>
          </md-content>
        </md-tab>
      </md-tabs>
    </div>
    <div class="md-content graph">graph</div>
  </div>
</template>
<script>
import ToDoItem from '../components/ToDoItem'
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
      'toDoItems',
      'doneItems'
    ])
  },
  methods: {
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
        items = this.doneItems
      } else {
        items = this.toDoItems
      }
      console.log(item, this.toDoItems)
      let n = 0
      for (const e of items) {
        if (e.key === item.key) {
          return n
        }
        n++
      }
    },
    moveItem (item, res = undefined) {
      let index = this.getIndex(item)
      let element
      let otherEle
      let distanceX
      let distanceY = '-48px'
      if (item.status) {
        let elements = document.querySelectorAll('.todo-item')
        element = elements[index]
        otherEle = [...elements].slice(index + 1)
        distanceX = '100px'
      } else {
        let elements = document.querySelectorAll('.done-item')
        element = elements[index]
        otherEle = [...elements].slice(index + 1)
        distanceX = '-100px'
      }
      let tl = this.$anime.timeline()
      tl.add({
        targets: element,
        translateX: distanceX,
        opacity: 0,
        easing: 'linear',
        offset: 0,
        complete: res
      }).add({
        targets: otherEle,
        translateY: distanceY,
        easing: 'linear',
        offset: 0,
        complete: () => {
          otherEle.forEach(e => {
            e.style.transform = ''
          })
        }
      })
    },
    addItem () {
      if (this.newToDo.content === '') return
      this.newToDo.key = Date.now()
      let itemTmp = Object.assign({}, this.newToDo)
      this.commitItem(itemTmp)
      this.newToDo.content = ''
    },
    ...mapMutations({
      commitItem: 'addItem',
      commitItemStatus: 'changeItemStatus'
    })
  },
  components: {
    ToDoItem
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
.new-todo{
  height: 15%;
  width: 80%;
}
.wrap-list{
  width: 80%;
  height: 80%;
  overflow: auto;
}
.wrap-list > .md-content{
  height: calc(100% - 48px) !important;
}
.wrap-list > .md-content > .md-tabs-container{
  height: 100%;
}
.wrap-list .list-content {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
#tab-todo, #tab-done{
  height: 100%;
}
.graph{
  width: 30%;
  display: inline-flex;
}
</style>
