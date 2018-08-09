<template>
<div>
  <md-field>
    <label>Want to do</label>
    <md-input v-model.lazy="newToDo.content" @keyup.enter="addToDo" ></md-input>
    <md-button class="md-icon-button" @click="addToDo">
      <md-icon>add</md-icon>
    </md-button>
  </md-field>
</div>
</template>
<script>
export default {
  props: {
    newToDo: {
      type: Object
    },
    addToDo: {
      type: Function
    }
  }
}
</script>
<style>
.newtodo{
  height: 20%;
  width: 80%;
}
</style>
