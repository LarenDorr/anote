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
import { mapMutations } from 'vuex'
import db from 'src/localdb'

let ipc = require('electron').ipcRenderer

export default {
  name: 'app',
  data () {
    return {
      isFullScreen: false,
      tabs: [
        {icon: 'format_list_bulleted', text: '待办', route: 'todo'},
        {icon: 'insert_drive_file', text: '笔记', route: 'note'},
        {icon: 'edit', text: '日志', route: 'log'}
      ]
    }
  },
  computed: {
    currentTab () {
      return this.$route.meta.name
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
    },
    ...mapMutations([
      'initTodo',
      'initSetting'
    ])
  },
  mounted () {
    let todos = db.getTodos()
    let dones = db.getDones()
    let setting = db.getSetting()
    this.initTodo({todos, dones})
    this.initSetting(setting)
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
    font-family: 'Microsoft YaHei' !important;
  }
  #app{
    height: 100%;
    width: 100%;
  }
</style>