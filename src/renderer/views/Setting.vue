<template>
  <div class="setting">
    <md-tabs class="setting-tabs">
      <!-- todo 相关设置 -->
      <md-tab md-label="Todo">
        <md-content class="setting-content">
          <md-switch v-model="hasTodoTag" class="md-primary" >启用Todo标签前缀</md-switch>
          <md-chips 
            v-model="todoTags" 
            md-placeholder="添加Todo标签前缀" 
            :md-static="!hasTodoTag"
            :md-clickable="false"
          ></md-chips>
        </md-content>
      </md-tab>
      <!-- note 相关设置 -->
      <md-tab md-label="Note">
        <md-content>
          Note setting
        </md-content>
      </md-tab>
      <!-- log 相关设置 -->
      <md-tab md-label="Log">
        <md-content>
          log setting
        </md-content>
      </md-tab>
    </md-tabs>
  </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
// import { mapMutations } from 'vuex'
import db from 'src/localdb'

export default {
  name: 'setting',
  computed: {
    ...mapFields([ // v-model绑定的对象可以使用库来设置
      'todo.hasTodoTag'
    ]),
    todoTags: { // 为数组时需手动设置set,get
      get () {
        return [].concat(this.$store.state.Setting.todo.todoTags) // 无法控制material组件数据的增删, 需使用拷贝值
      },
      set: function (val) {
        this.$store.commit('changeTags', val)
      }
    }
  },
  methods: {
    sortTag () {
      let dones = db.getAllDones()
      let todos = db.getTodos()
      let tags = db.getSetting().todo.todoTags.concat([]) // 正在使用的tags
      let allTodos = [] // 所有todo
      allTodos.push(...todos)
      for (const day in dones) {
        allTodos.push(...dones[day])
      }
      let allTags = [] // 所有todo的tags
      allTodos.forEach(e => {
        if (e.tag && !allTags.includes(e.tag)) {
          allTags.push(e.tag)
        }
      })
      allTags = Array.from(new Set(allTags.concat(tags))) // 某些tag还没有todo
      let result = {} // 所有tag的使用次数的结果
      allTags.forEach(e => { // 置0
        result[e] = 0
      })
      allTodos.forEach(e => { // 统计tag使用次数
        if (e.tag && allTags.includes(e.tag)) {
          result[e.tag] += 1
        }
      })
      tags.sort((a, b) => { // 按使用次数的多少进行排序
        if (result[a] > result[b]) {
          return -1
        }
        if (result[a] < result[b]) {
          return 1
        }
        if (result[a] === result[b]) {
          return 0
        }
      })
      this.$store.commit('changeTags', tags)
    }
  },
  updated () {
    let setting = this.$store.state.Setting
    db.setSetting(setting)
  },
  mounted () {
    this.sortTag()
  }
}
</script>

<style>
.setting{
  height: 100%;
}
.setting-tabs{
  width: 80%;
  margin: 30px 0 0 40px;
}
.setting-content{
  padding-left: 10px;
}
</style>
