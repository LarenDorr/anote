<template>
  <div :class="{'done-item': itemTmp.status,'todo-item': !itemTmp.status}">
    <!-- 改变todo状态 -->
    <md-checkbox v-model="itemTmp.status" class="item-check"></md-checkbox>
    <!-- todo具体内容 -->
    <md-field class="item-content">
      <!-- todo tag 前缀 -->
      <span class="md-prefix item-tag" v-if="todoSetting.hasTodoTag">{{itemTag}}</span>
      <md-input v-model="itemTmp.content" class="item-input" :isLazy="isLazy" :disabled="this.isFreeze"></md-input>
      <!-- 是否重要icon -->
      <md-icon class="item-important" v-show="itemTmp.top">priority_high</md-icon>
    </md-field>
    <!-- 标记todo是否重要 -->
    <md-button class="md-icon-button item-top" @click="toggleTop" v-show="!this.isFreeze">
      <md-icon v-if="itemTmp.top">arrow_downward</md-icon>
      <md-icon v-else>arrow_upward</md-icon>
    </md-button>
    <!-- 删除todo -->
    <md-button class="md-icon-button item-delete" @click="handleDel" v-show="!this.isFreeze">
      <md-icon>delete</md-icon>
    </md-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'todoItem',
  props: {
    item: { // todo项
      type: Object,
      default: () => {
        return {}
      }
    },
    isFreeze: { // 是否冻结todo的删除,置顶操作
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      itemTmp: Object.assign({}, this.item), // 拷贝传入值,不能直接改动props
      isLazy: true
    }
  },
  computed: {
    itemTag: function () { // 格式化tag显示
      let tag = this.itemTmp.tag
      if (tag) {
        return `[${tag}]`
      } else {
        return ``
      }
    },
    ...mapState({
      'todoSetting': state => state.Setting.todo // 控制tag显示
    })
  },
  watch: {
    itemTmp: { // 改变时触发事件
      handler: function (item) {
        this.$emit('change', Object.assign({}, item))
      },
      deep: true
    },
    item: function () { // props改变时重新复制
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
.item-tag{
  color: black !important;
}
/* 修改UI库 */
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