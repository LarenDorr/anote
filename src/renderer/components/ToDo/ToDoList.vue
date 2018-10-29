<template>
  <div>
    <md-tabs class="list-tabs md-scrollbar md-theme-default">
      <md-tab id="tab-todo" md-label="待办" to="">
        <md-content class="md-scrollbar list-content">
          <ToDoItem v-for="toDo in toDoList" :item="toDo" :key="toDo.key" 
          @change="handleChange" @delete="handleDelete" class="list-item" 
          :isFreeze=false></ToDoItem>
        </md-content>
      </md-tab>
      <md-tab id="tab-done" md-label="已办" to="">
        <md-content class="md-scrollbar list-content">
          <ToDoItem v-for="done in doneList" :item="done" :key="done.key" 
          @change="handleChange" @delete="handleDelete" class="list-item" 
          :isFreeze=true></ToDoItem>
        </md-content>
      </md-tab>
    </md-tabs>
  </div>
</template>
<script>
import ToDoItem from '@/components/ToDo/ToDoItem'
export default {
  props: {
    toDoList: {
      type: Array,
      default: () => {
        return []
      }
    },
    doneList: {
      type: Array,
      default: () => {
        return []
      }
    },
    handleChange: {
      type: Function,
      default: () => {}
    },
    handleDelete: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    ToDoItem
  }
}
</script>
<style>
.list-tabs{
  height: 100%;
}
.slide-fade > div{
  transition: all 0.4s ease-out;
	opacity: 0;
}
.slide-fade > .item-show{
  opacity: 1;
}
/* 覆盖UI库样式*/
.list-tabs > .md-content{
  height: calc(100% - 48px) !important;
}
#tab-todo{
  padding: 0 !important;
} 
.list-tabs > .md-content > .md-tabs-container{
  height: 100%;
}
.list-tabs .list-content {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
#tab-todo, #tab-done{
  height: 100%;
}
</style>
