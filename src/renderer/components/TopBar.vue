<template>
  <div class="topbar">
    <md-toolbar>
      <div class="md-toolbar-section-start">
        <span class="md-title">ANote</span>
      </div>
        <p class="md-subheading">{{currentTab}}</p>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button fix-drag" v-show="!isFullScreen" @click="window.changeSize">
          <md-icon>fullscreen</md-icon>
        </md-button>
        <md-button class="md-icon-button fix-drag" v-show="isFullScreen" @click="window.changeSize">
          <md-icon>fullscreen_exit</md-icon>
        </md-button>
        <md-button class="md-icon-button fix-drag" @click="window.close">
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
  .fix-drag{
    -webkit-app-region: no-drag;/* 修复frag造成的按钮无法点击 */
  }
  .topbar .md-toolbar{ /* 覆盖UI库默认样式 */
    min-height: 64px;
  }
</style>
