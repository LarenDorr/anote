<template>
  <div id="app">
    <TopBar 
      :isFullScreen="isFullScreen" 
      :currentTab="currentTab"
      :window="{
        changeSize: changeWindowSize,
        close: closeWindow
      }"
    ></TopBar>
    <LeftBar
      :tabs="tabs"
      :goTo="goTo"
    ></LeftBar>
    <Content></Content>
  </div>
</template>
<script>
import TopBar from '@/components/TopBar'
import LeftBar from '@/components/LeftBar'
import Content from '@/components/Content'

let ipc = require('electron').ipcRenderer

export default {
  name: 'app',
  data () {
    return {
      isFullScreen: false,
      currentTab: '待办',
      tabs: [
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
    changeWindowSize  () {
      if (this.isFullScreen) {
        ipc.send('minSizeWindow')
        this.isFullScreen = false
      } else {
        ipc.send('maxSizeWindow')
        this.isFullScreen = true
      }
    },
    goTo (route, name) {
      this.$router.push(`/${route}`)
      this.currentTab = name
    }
  },
  components: {
    TopBar,
    LeftBar,
    Content
  }
}
</script>
<style>
  html, body {
    height: 100%;
  }
  #app{
    height: 100%;
    width: 100%;
  }
</style>