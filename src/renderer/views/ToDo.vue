<template>
  <div class="to-do ">
    <div class="md-content todo ">
      <NewToDo
        :newToDo="newToDo"
        :addToDo="addToDo"
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
    <div class="md-content graph">graph</div>
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
        top: false
      }
    }
  },
  computed: {
    ...mapState({
      'todos': state => state.ToDo.todos,
      'dones': state => state.ToDo.dones
    })
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
            item.top = false
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
        return {
          mainEle: {
            targets: currentEle,
            anime: {
              before: {
                transform: 'translateX(0)',
                opacity: 1
              },
              after: {
                transform: `translateX(${currentEleLen})`,
                opacity: 0
              }
            }
          },
          otherEle: {
            targets: otherEle,
            anime: {
              before: {
                transform: 'translateY(0)'
              },
              after: {
                transform: `translateY(${otherEleLen})`
              }
            }
          },
          timeline: {
            duration: 1000,
            easing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
          }
        }
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
        return {
          mainEle: {
            targets: currentEle,
            anime: {
              before: {
                transform: 'translateY(0)'
              },
              after: {
                transform: `translateY(${currentEleLen})`
              }
            }
          },
          otherEle: {
            targets: otherEle,
            anime: {
              before: {
                transform: 'translateY(0)'
              },
              after: {
                transform: `translateY(${otherEleLen})`
              }
            }
          },
          timeline: {
            duration: 600,
            easing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
          }
        }
      } else if (prop === 'delete') { // 删除元素
        let selector = item.status === true ? '.done-item' : '.todo-item'
        let elements = document.querySelectorAll(selector)
        currentEle = elements[index]
        currentEleLen = '100px'
        otherEle = [...elements].slice(index + 1)
        otherEleLen = '-48px'
        return {
          mainEle: {
            anime: {
              before: {
                height: '48px',
                opacity: 1
              },
              after: {
                height: '0px',
                opacity: 0
              }
            },
            targets: currentEle
          },
          otherEle: null,
          timeline: {
            duration: 600,
            easing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
          }
        }
      }
    },
    addAnime (animeData) {
      return new Promise((resolve, reject) => {
        let { mainEle, otherEle, timeline } = animeData // 主要元素 其他元素 和其缓动函数
        let mainAnime = mainEle.targets.animate( // 主要元素添加动画
          [mainEle.anime.before, mainEle.anime.after],
          timeline
        )
        mainAnime.pause()
        if (otherEle) { // 其他元素添加动画
          otherEle.targets.forEach(e => {
            e.animate(
              [otherEle.anime.before, otherEle.anime.after],
              timeline
            )
          })
        }
        mainAnime.onfinish = () => {
          resolve()
        }
        mainAnime.play()
      })
    },
    addToDo () {
      if (this.newToDo.content === '') return
      let count = this.$db.get('todosCount').value() || 0
      this.newToDo.key = count++
      let itemTmp = Object.assign({}, this.newToDo)
      itemTmp.initDate = this.$dayjs().unix()
      this.addItem(itemTmp)
      this.newToDo.content = ''
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
      let todos
      let dones
      let today = this.$dayjs().format('YYYYMMDD')
      todos = db.get('todos').value() || []
      dones = db.get(`dones.d${today}`).value() || []
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
    this.putData()
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
