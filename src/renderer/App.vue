<template>
  <div id="app">
    <!-- 上方标题栏 -->
    <div class="top">
      <md-toolbar class="topbar">
        <div class="md-toolbar-section-start">
          <span class="md-title">ANote</span>
        </div>
          <p class="md-subheading">{{currentTab}}</p>
        <div class="md-toolbar-section-end">
          <div>
            <md-icon class="letMove">zoom_out_map</md-icon>
          </div>
          <md-button class="md-icon-button" v-show="!isFullScreen" @click="maxSizeWindow">
            <md-icon>fullscreen</md-icon>
          </md-button>
          <md-button class="md-icon-button" v-show="isFullScreen" @click="minSizeWindow">
            <md-icon>fullscreen_exit</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="closeWindow">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </md-toolbar>
    </div>
    <!-- 中部 -->
    <div class="middle">
      <!-- 左侧导航栏 -->
      <md-drawer :md-active="false" md-persistent="mini" class="leftbar">
        <md-list>
          <md-list-item v-for="tab in Tabs" :key="tab.icon" @click="goTo(tab.route,tab.text)" :class="{'activeTab': tab.route == $route.name}">
            <md-icon class="left-icon" :class="{'activeIcon': tab.route == $route.name}">{{tab.icon}}</md-icon>
            <span class="md-list-item-text">{{tab.text}}</span>
          </md-list-item>
          <md-list-item @click="goTo('setting','设置')" class="bar-setting" >
            <md-icon :class="{'icon-rotate': $route.name == 'setting'}">settings</md-icon>
            <span class="md-list-item-text">设置</span>
          </md-list-item>
        </md-list>
      </md-drawer>
      <!-- 内容区 -->
      <md-content class="content ">
        <keep-alive>
          <transition name="top-fade">
            <router-view></router-view>
          </transition>
        </keep-alive>
      </md-content>
    </div>
  </div>
</template>

<script>
let ipc = require('electron').ipcRenderer
export default {
  name: 'app',
  data () {
    return {
      isFullScreen: false,
      currentTab: '待办',
      Tabs: [
        {icon: 'format_list_bulleted', text: '待办', route: 'todo'},
        {icon: 'insert_drive_file', text: '便笺', route: 'note'},
        {icon: 'edit', text: '日志', route: 'log'}
      ]
    }
  },
  methods: {
    closeWindow  () {
      ipc.send('closeMainWindow')
    },
    maxSizeWindow  () {
      ipc.send('maxSizeWindow')
      this.isFullScreen = true
    },
    minSizeWindow  () {
      ipc.send('minSizeWindow')
      this.isFullScreen = false
    },
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    goTo (route, name) {
      this.$router.push(`/${route}`)
      this.currentTab = name
    }
  }
}
</script>
<style>
  /* CSS */

  html,
  body {
    height: 100%;
  }
  #app{
    height: 100%;
    width: 100%;
  }
  .md-list-item{
    transition: 0.4s all ease;
  }
  .activeTab{
    transition: 0.4s all ease;
    transform: scale(1.5);
  }
  .top{
    height: 64px;
  }
  .middle,.leftbar{
    height: calc(100% - 64px);
  }
  .content{
    height: 100%;
    width: calc(100% - 70px);
    margin-left: 70px;
    overflow: hidden;
  }
  .topbar{
    min-height: 64px;
  }
  .letMove{
    transform: rotate(45deg) scale(0.7);
    -webkit-app-region: drag;
    cursor: move;
  }
  .bar-setting{
    margin-top: 20px;  
  }
  .icon-rotate{
    animation: rotateing 2s linear  infinite  ;
  }
  .top-fade-enter-active, .top-fade-leave-active {
    transition: all .2s;
  }
  .top-fade-leave-to {
    /* transform: translateY(-50px); */
    opacity: 0;
  }
  .top-fade-enter{
    /* transform: translateY(50px); */
    opacity: 0;
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