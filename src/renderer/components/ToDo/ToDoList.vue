<template>
  <div>
    <md-tabs class="list-tabs md-scrollbar md-theme-default">
      <md-tab id="tab-todo" md-label="待办" to="">
        <md-content class="md-scrollbar list-content">
          <transition-group name="list-todo" >
            <ToDoItem v-for="toDo in toDoList" :item="toDo" :key="toDo.key" 
            @change="handleChange" @delete="handleDelete" class="list-item" 
            :isFreeze=false></ToDoItem>
          </transition-group>
        </md-content>
      </md-tab>
      <md-tab id="tab-done" md-label="已办" to="">
        <md-content class="md-scrollbar list-content">
          <transition-group name="list-dones" >
            <ToDoItem v-for="done in doneList" :item="done" :key="done.key" 
            @change="handleChange" @delete="handleDelete" class="list-item" 
            :isFreeze=true></ToDoItem>
          </transition-group>
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
.list-item{
  transition: all 0.5s;
}
.list-todo-enter, .list-todo-leave-to{
  opacity: 0;
  transform: translateX(50px);
}
.list-dones-enter, .list-dones-leave-to{
  opacity: 0;
  transform: translateX(-50px);
}
.list-todo-leave-active, .list-dones-leave-active {
  position: absolute;
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
