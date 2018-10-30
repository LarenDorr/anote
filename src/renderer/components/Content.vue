<template>
  <md-content class="content">
    <keep-alive>
      <transition :name="slideDriction" mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </md-content>
</template>
<script>
  export default {
    data () {
      return {
        slideDriction: ''
      }
    },
    watch: {
      '$route' (to, from) {
        let obj = {
          'todo': 1,
          'note': 2,
          'log': 3,
          'setting': 4
        }
        let res = obj[to.name] - obj[from.name]
        if (res > 0) {
          this.slideDriction = 'slide-down'
        } else {
          this.slideDriction = 'slide-top'
        }
      }
    }
  }
</script>
<style>
  .content{
    height: calc(100% - 64px);
    width: calc(100% - 72px);
    display: inline-block;
    vertical-align:top; /* 解决inline-block高度bug（？）*/
    overflow: hidden;
    margin-left: -4px; /* 解决inline-block宽度bug（？）*/
  }
  .slide-top-enter-active, .slide-top-leave-active {
    transition: all linear 0.15s;
  }
  .slide-top-enter {
    opacity: 0;
    transform: translateY(-100%);
  }
   .slide-top-leave-to{
    opacity: 0;
    transform: translateY(100%);
   }
  .slide-down-enter-active, .slide-down-leave-active {
    transition: all linear 0.15s;
  }
  .slide-down-enter{
    opacity: 0;
    transform: translateY(100%);
  }
  .slide-down-leave-to{
    opacity: 0;
    transform: translateY(-100%);
  }
</style>
