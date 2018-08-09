<template>
  <div class="leftbar">
    <md-drawer :md-active="false" md-persistent="mini" class="leftbar">
      <md-list>
        <md-list-item v-for="tab in tabs" :key="tab.icon" @click="goTo(tab.route,tab.text)" :class="{'activeTab': tab.route == $route.name}">
          <md-icon class="left-icon" :class="{'activeIcon': tab.route == $route.name}">{{tab.icon}}</md-icon>
          <span class="md-list-item-text">{{tab.text}}</span>
        </md-list-item>
        <md-list-item @click="goTo('setting','设置')" class="bar-setting" >
          <md-icon :class="{'icon-rotate': $route.name == 'setting'}">settings</md-icon>
          <span class="md-list-item-text">设置</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array
    },
    goTo: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
<style>
  .activeTab{
    transition: 0.4s all ease;
    transform: scale(1.5);
  }
  .leftbar{
    height: calc(100% - 64px);
    width: 70px;
    display: inline-block;
    vertical-align:top; /* 解决inline-block高度bug（？）*/
  }
  .leftbar .md-list-item{
    transition: .4s all ease;
  }
  .bar-setting{
    margin-top: 20px;  
  }
  .icon-rotate{
    animation: rotateing 2s linear  infinite  ;
  }
  @keyframes rotateing{
      from{
        transform: rotate(0deg);
      }
      to{
        transform: rotate(359deg);
      }
    }
</style>
