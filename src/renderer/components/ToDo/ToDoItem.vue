<template>
  <div :class="{'done-item': itemTmp.status,'todo-item': !itemTmp.status}">
    <md-checkbox v-model="itemTmp.status" class="item-check"></md-checkbox>
    <md-field class="item-content" >
      <md-input v-model="itemTmp.content" class="item-input"></md-input>
      <md-icon class="item-important" v-show="itemTmp.top">priority_high</md-icon>
    </md-field>
    <md-button class="md-icon-button item-top" @click="toggleTop" v-show="!this.isFreeze">
      <md-icon v-if="itemTmp.top">arrow_downward</md-icon>
      <md-icon v-else>arrow_upward</md-icon>
    </md-button>
    <md-button class="md-icon-button item-delete" @click="handleDel" v-show="!this.isFreeze">
      <md-icon>delete</md-icon>
    </md-button>
  </div>
</template>
<script>
export default {
  name: 'todoItem',
  props: ['item', 'isFreeze'],
  data () {
    return {
      itemTmp: Object.assign({}, this.item) // 拷贝传入值
    }
  },
  watch: {
    itemTmp: {
      handler: function (item) {
        this.$emit('change', Object.assign({}, item))
      },
      deep: true
    },
    item: function () { // 当store中的数据改变时传入
      this.itemTmp = Object.assign({}, this.item)
    }
  },
  methods: {
    handleDel () {
      this.$emit('delete', this.itemTmp)
    },
    toggleTop () {
      this.itemTmp.top = !this.itemTmp.top
    }
  }
}
</script>
<style>
.list-item{
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
}
.item-input{
  text-overflow: ellipsis;
}
/* 修改UI库 */
.item-important{
  margin-top: 8px !important;
}
.item-check{
  margin: 0px 14px 8px 14px;
}
.item-content{ 
  display: inline-flex;
  overflow: hidden;
}
.list-item > .md-icon-button{
  opacity: 0;
  transition: all ease 0.5s;
}
.list-item:hover .md-icon-button{
  opacity: 1;
  transition: all ease 0.5s;
}
.item-content::after{
  height: 0;
}
.item.delete{
  margin: 4px;
}

</style>