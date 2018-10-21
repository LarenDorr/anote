<template>
  <div :class="{'done-item': itemTmp.status,'todo-item': !itemTmp.status}">
    <md-checkbox v-model="itemTmp.status" class="item-check"></md-checkbox>
    <md-field class="item-content">
      <md-input v-model="itemTmp.content" class="item-input" ></md-input>
      <md-button class="md-icon-button item-top" @click="toggleTop" v-show="!this.isFreeze">
        <md-icon v-if="itemTmp.top">arrow_downward</md-icon>
        <md-icon v-else>arrow_upward</md-icon>
      </md-button>
      <md-button class="md-icon-button item-delete" @click="handleDel" v-show="!this.isFreeze">
        <md-icon>delete</md-icon>
      </md-button>
      <md-icon class="item-important" v-show="itemTmp.top">priority_high</md-icon>
    </md-field>
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
/* 修改UI库 */
.item-important{
  margin-top: 8px !important;
}
.item-check{
  margin: 0px 14px 8px 14px;
}
.item-content{ 
  display: inline-flex;
  width: 80%;
  overflow: hidden;
}
.item-content > .md-icon-button{
  transform: translateY(30px)
}
.item-content:hover .md-icon-button{
  transform: translateY(0px)
}
.item-content::after{
  height: 0;
}
.item.delete{
  margin: 4px;
}

</style>