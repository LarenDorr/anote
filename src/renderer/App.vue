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

import { ipcRenderer } from 'electron'

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
      ipcRenderer.send('closeMainWindow')
    },
    changeWindowSize  () {
      if (this.isFullScreen) {
        ipcRenderer.send('minSizeWindow')
        this.isFullScreen = false
      } else {
        ipcRenderer.send('maxSizeWindow')
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
    // 初始化数据
    let todos = db.getTodos()
    let dones = db.getDones()
    let setting = db.getSetting()
    let isMax = db.getWindowIsMax()
    this.isFullScreen = isMax
    this.initTodo({todos, dones})
    this.initSetting(setting)
    // 监听窗口变化
    ipcRenderer.on('window-isMax', (event, isMax) => {
      this.isFullScreen = isMax
    })
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