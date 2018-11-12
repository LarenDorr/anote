<template>
  <div class="log">
    <md-field>
      <md-input v-model="val" :isLazy="false"></md-input>
    </md-field>
  </div>
</template>
<script>
export default {
  data () {
    return {
      val: ''
    }
  }
}
</script>

<style>
.log{
  height: 100%;
  width: 100%;
}
</style>
