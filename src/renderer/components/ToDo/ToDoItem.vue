<template>
  <div class="list-item" :class="{'done-item': itemTmp.status,'todo-item': !itemTmp.status}">
    <md-checkbox v-model="itemTmp.status" class="item-check"></md-checkbox>
    <md-field class="item-content" :class="{'item-important':itemTmp.top}">
      <md-input v-model="itemTmp.content" class="item-input" ></md-input>
      <md-button class="md-icon-button item-top" @click="toggleTop">
        <md-icon v-if="itemTmp.top">arrow_downward</md-icon>
        <md-icon v-else>arrow_upward</md-icon>
      </md-button>
      <md-button class="md-icon-button item-delete" @click="this.$emit('delete', itemTmp.key)">
        <md-icon>delete</md-icon>
      </md-button>
    </md-field>
  </div>
</template>
<script>
export default {
  name: 'todoItem',
  props: ['item'],
  data () {
    return {
      itemTmp: Object.assign({}, this.item) // 拷贝传入值
    }
  },
  watch: {
    itemTmp: {
      handler: function (item) {
        this.$emit('change', item)
      },
      deep: true
    },
    item: function () { // 当store中的数据改变时传入
      console.log('item change')
      this.itemTmp = Object.assign({}, this.item)
    }
  },
  methods: {
    toggleTop () {
      this.itemTmp.top = !this.itemTmp.top
      // this.itemMove()
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
.item-important{
  /* -webkit-text-fill-color: #448aff !important; */
  /* font-weight: bold; */
  border-bottom: 1px solid black !important;
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