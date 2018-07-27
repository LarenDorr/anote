<template>
  <div id="app">
    <md-app class="app">
      <!-- 上方 导航栏 -->
      <md-app-toolbar class="topbar">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">ANote</span>
        <!-- 右上角 -->
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
      </md-app-toolbar>
      <!-- 左侧 导航栏 -->
      <md-app-drawer md-persistent="mini" :md-active.sync="menuVisible" class="side-bar">
        <md-list>
          <md-list-item @click="toggleMenu" v-if="menuVisible">
            <md-icon >arrow_back_ios</md-icon>
            <span class="md-list-item-text"></span>
          </md-list-item>
          <md-list-item v-for="tab in Tabs" :key="tab.icon" @click="goTo(tab.route)" :class="{'activeTab': tab.route == $route.name}">
            <md-icon>{{tab.icon}}</md-icon>
            <span class="md-list-item-text">{{tab.text}}</span>
          </md-list-item>
          <md-list-item @click="goTo('setting')" class="bar-setting" >
            <md-icon class="icon-rotate">settings</md-icon>
            <span class="md-list-item-text">设置</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content class="content">
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
let ipc = require('electron').ipcRenderer
export default {
  name: 'app',
  data () {
    return {
      isFullScreen: false,
      menuVisible: false,
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
    goTo (route) {
      this.$router.push(`/${route}`)
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
  }
  .md-app {
    min-height: 100%;
    border: 1px solid rgba(#000, .12);
  }
  .md-drawer {
    width: 230px;
    max-width: 20%;
  }
  .md-list-item{
    transition: 0.7s all ease;
  }
  .activeTab{
    /* transform: scale(1.6); */
    transition: 0.7s all ease;
    background-color: #ccc;
  }
  .topbar{
    /* height: 8%; */
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
  @keyframes rotateing{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(359deg);
    }
  }
</style>