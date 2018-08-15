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
        :handleDelete="handleDelete"
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
      if (prop === undefined) {
        return
      }
      const rules = {
        content: () => {
          this.changeItem({
            item: item,
            prop: prop
          })
        },
        status: () => {
          if (item.status === true) {
            item.doneDate = this.$dayjs().unix()
          } else {
            item.doneDate = ''
          }
          this.addAnime(this.computeAnimeData(item, prop)).then(() => {
            this.changeItem({
              item: item,
              prop: prop
            })
          })
        },
        top: () => {
          this.addAnime(this.computeAnimeData(item, prop)).then(() => {
            this.changeItem({
              item: item,
              prop: prop
            })
          })
        }
      }
      rules[prop]()
    },
    handleDelete (item) {
      this.addAnime(this.computeAnimeData(item, 'delete')).then(() => {
        this.deleteItem(item.key)
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
    getIndex (key) {
      let n = 0
      for (const e of this.toDoList) {
        if (e.key === key) {
          return n
        }
        n++
      }
      n = 0
      for (const e of this.doneList) {
        if (e.key === key) {
          return n
        }
        n++
      }
    },
    computeAnimeData (item, prop) {
      let index = this.getIndex(item.key) // 获取元素在其列表中的位置
      let currentEle, otherEle, currentEleLen, otherEleLen
      if (prop === 'status') { // 左右移动
        if (item.status === true) { // 右移
          let elements = document.querySelectorAll('.todo-item')
          currentEle = elements[index]
          otherEle = [...elements].slice(index + 1)
          currentEleLen = '100px'
        } else { // 左移
          let elements = document.querySelectorAll('.done-item')
          currentEle = elements[index]
          otherEle = [...elements].slice(index + 1)
          currentEleLen = '-100px'
        }
        otherEleLen = '-48px'
        return [
          {
            targets: currentEle,
            translateX: currentEleLen,
            opacity: 0,
            easing: 'linear',
            offset: 0
          },
          {
            targets: otherEle,
            translateY: otherEleLen,
            easing: 'linear',
            offset: 0
          }
        ]
      } else if (prop === 'top') { // 上下移动
        if (item.top === true) { // 向上移动
          let elements = document.querySelectorAll('.todo-item')
          currentEle = elements[index]
          currentEleLen = index * -48 + 'px'
          otherEle = [...elements].slice(0, index)
          otherEleLen = '48px'
        } else {
          let elements = document.querySelectorAll('.todo-item')
          currentEle = elements[index]
          currentEleLen = (elements.length - index - 1) * 48 + 'px'
          otherEle = [...elements].slice(index + 1)
          otherEleLen = '-48px'
        }
        return [
          {
            targets: currentEle,
            translateY: currentEleLen,
            easing: 'linear',
            offset: 0
          },
          {
            targets: otherEle,
            translateY: otherEleLen,
            easing: 'linear',
            offset: 0
          }
        ]
      } else if (prop === 'delete') { // 删除元素
        let selector = item.status === true ? '.done-item' : '.todo-item'
        let elements = document.querySelectorAll(selector)
        currentEle = elements[index]
        currentEleLen = '100px'
        otherEle = [...elements].slice(index + 1)
        otherEleLen = '-48px'
        return [
          {
            targets: currentEle,
            height: 0,
            opacity: 0,
            easing: 'linear',
            offset: 0
          },
          {
            targets: otherEle,
            easing: 'linear',
            offset: 0
          }
        ]
      }
    },
    addAnime (animeData) {
      let current = animeData[0]
      let other = animeData[1]
      return new Promise((resolve, reject) => {
        let tl = this.$anime.timeline()
        tl.add(Object.assign({
          complete: () => {
            resolve()
            current.targets.removeAttribute('style')
          }
        }, current))
          .add(Object.assign({
            complete: () => {
              other.targets.forEach(e => {
                e.removeAttribute('style') // 消除anime动画库样式
              })
            }
          }, other))
      })
    },
    addToDo () {
      if (this.newToDo.content === '') return
      this.newToDo.key = Date.now()
      let itemTmp = Object.assign({}, this.newToDo)
      itemTmp.initDate = this.$dayjs().unix()
      this.addItem(itemTmp)
      this.newToDo.content = ''
    },
    ...mapMutations([
      'addItem',
      'changeItem',
      'deleteItem'
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
