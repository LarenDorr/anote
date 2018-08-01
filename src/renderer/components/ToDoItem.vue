<template>
  <div class="list-item" :class="{'done-item': itemTmp.status,'todo-item': !itemTmp.status}">
    <md-checkbox v-model="itemTmp.status" class="item-check"></md-checkbox>
    <md-field class="item-content" >
      <md-input v-model="itemTmp.content" class="item-input" :class="{'item-important':itemTmp.top}"></md-input>
      <md-button class="md-icon-button item-top" @click="toggleTop">
        <md-icon v-if="itemTmp.top">arrow_downward</md-icon>
        <md-icon v-else>arrow_upward</md-icon>
      </md-button>
      <md-button class="md-icon-button item-delete" @click="delItem(itemTmp.key)">
        <md-icon>delete</md-icon>
      </md-button>
    </md-field>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'todoItem',
  props: ['item'],
  data () {
    return {
      itemTmp: Object.assign({}, this.item)
    }
  },
  watch: {
    // itemTmp: {
    //   handler: function (val, oldval) {
    //     // this.modifyItem(this.itemTmp)
    //     console.log(val, oldval)
    //   },
    //   deep: true
    // },
    item: function () { // 当store中的数据改变时传入
      this.itemTmp = this.item
    },
    'itemTmp.status': function () { // item状态改变时
      this.$emit('status-change', this.itemTmp)
    },
    'itemTmp.content': function () { // item状态改变时
      this.$emit('content-change', this.itemTmp)
    },
    'itemTmp.top': function () { // item状态改变时
      this.$emit('top-change', this.itemTmp)
    }
  },
  methods: {
    toggleTop () {
      this.itemTmp.top = !this.itemTmp.top
      // this.itemMove()
    },
    delItem (key) {
      this.deleteItem(key)
    },
    ...mapMutations([
      'deleteItem'
    ])
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
  font-weight: bold;
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