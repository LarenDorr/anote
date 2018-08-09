<template>
  <div class="topbar">
    <md-toolbar style="">
      <div class="md-toolbar-section-start">
        <span class="md-title">ANote</span>
      </div>
        <p class="md-subheading">{{currentTab}}</p>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" v-show="!isFullScreen" @click="window.changeSize">
          <md-icon>fullscreen</md-icon>
        </md-button>
        <md-button class="md-icon-button" v-show="isFullScreen" @click="window.changeSize">
          <md-icon>fullscreen_exit</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="window.close">
          <md-icon>close</md-icon>
        </md-button>
      </div>
    </md-toolbar>
  </div>
</template>
<script>
  export default {
    props: {
      currentTab: {
        type: String,
        default: ''
      },
      isFullScreen: {
        type: Boolean,
        default: false
      },
      window: {
        type: Object,
        changeSize: {
          type: Function,
          default: () => {}
        },
        close: {
          type: Function,
          default: () => {}
        }
      }
    }
  }
</script>
<style>
  .topbar{
    height: 64px;
    -webkit-app-region: drag;
    user-select: none;
  }
  .topbar .md-toolbar{ /* 覆盖UI库默认样式 */
    min-height: 64px;
  }
  .md-toolbar-section-end{
    -webkit-app-region: no-drag;
  }
</style>
