<template>
  <div>
    <md-field class="newtodo-tag fix-drag" v-if="setting.hasTodoTag">
      <label>Tag</label>
      <md-select v-model="newToDo.tag" md-dense>
        <md-option v-for="(tag, index) in setting.todoTags" :value="tag" :key="index">{{tag}}</md-option>
      </md-select>
    </md-field>
    <md-field>
      <label>Want to do</label>
      <md-input v-model="newToDo.content" @keyup.enter="addTodo" ></md-input>
    </md-field>
    <md-button class="md-icon-button" @click="clearNewTodo">
      <md-icon>clear</md-icon>
    </md-button>
  </div>
</template>
<script>
export default {
  props: {
    newToDo: {
      type: Object
    },
    addTodo: {
      type: Function
    },
    setting: {
      type: Object
    },
    clearNewTodo: {
      type: Function
    }
  }
}
</script>
<style>
.newtodo-tag{
  width: 25%;
}
ul.md-list{
  -webkit-app-region: no-drag; /* 修复frag造成的按钮无法点击 */
}
</style>
