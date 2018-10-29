<template>
  <div class="setting">
    <md-tabs class="setting-tabs">
      <md-tab md-label="Todo">
        <md-content class="setting-content">
          <md-switch v-model="hasTodoTag" class="md-primary" >启用Todo标签前缀</md-switch>
          <md-chips v-model="todoTags" md-placeholder="添加Todo标签前缀" :md-static="!hasTodoTag"
          ></md-chips>
        </md-content>
      </md-tab>
      <md-tab md-label="Note">
        <md-content>
          Note setting
        </md-content>
      </md-tab>
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
export default {
  name: 'setting',
  computed: {
    ...mapFields([ // v-model绑定的对象可以使用库来设置
      'todo.hasTodoTag'
    ]),
    todoTags: { // 为数组时需手动设置set,get
      get () {
        return [].concat(this.$store.state.Setting.todo.todoTags)
      },
      set: function (val) {
        this.$store.commit('changeTags', val)
      }
    }
  },
  updated () {
    let setting = this.$store.state.Setting
    this.$db.set('setting', setting).write()
  }
}
</script>

<style>
.setting-tabs{
  width: 80%;
  margin: 30px 0 0 40px;
}
.setting-content{
  padding-left: 10px;
}
</style>
