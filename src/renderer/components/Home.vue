<template>
  <div class="home">
    <md-toolbar class="topbar">
      <h3 class="md-title" style="flex: 1">ANote</h3>
      <md-button class="md-icon-button" @click="minSizeWindow()" v-if="isFullScreen">
        <md-icon>fullscreen_exit</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="maxSizeWindow()" v-else>
        <md-icon>fullscreen</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="closeWindow()">
        <md-icon>clear</md-icon>
      </md-button>
    </md-toolbar>
    <aside class="tabs">
      <div class="tab" :class="currentTab === 'list' ? 'activeTab':''">
        <md-button class="md-icon-button tab-button md-accent" :class="currentTab === 'list' ? 'activeTabButton':''" @click="goList">
          <md-icon class="list" >list</md-icon>
        </md-button>
        
      </div>
      <div class="tab" :class="currentTab === 'note' ? 'activeTab':''">
        <md-button class="md-icon-button" :class="currentTab === 'note' ? 'activeTabButton':''" @click="goNote">
          <md-icon class="note">note</md-icon>
        </md-button>
      </div>
    </aside>
    <div class="content">
      llllll
    </div>
  </div>
</template>
<script>
  let ipc = require('electron').ipcRenderer
  export default {
    name: 'home',
    data () {
      return {
        isFullScreen: false,
        currentTab: 'list'
      }
    },
    methods: {
      closeWindow  () {
        if (this.$route.name === 'home') {
          ipc.send('closeMainWindow')
        }
      },
      maxSizeWindow  () {
        ipc.send('maxSizeWindow')
        this.isFullScreen = true
      },
      minSizeWindow  () {
        ipc.send('minSizeWindow')
        this.isFullScreen = false
      },
      goList () {
        this.currentTab = 'list'
      },
      goNote () {
        this.currentTab = 'note'
      }
    }
  }
</script>
<style>
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
    margin: 0;
  }
  .home {
    height: 100%;
  }
  .tabs {
    width: 15%;
    float: left;
    height: 88%;
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-right: 1px solid black;
  }
  .tab {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .activeTab{
    background-color: #eee;
  }
  .activeTabButton{
    transform: scale(2)
  }
  .note{
    transform: rotate(-90deg)
  }
  .content {
    width: 85%;
    height: 88%;
    float: right;
    /* border: 1px solid black; */
  }
</style>