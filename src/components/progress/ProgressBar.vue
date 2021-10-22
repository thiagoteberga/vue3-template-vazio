<template>
  <div class="progress">
      <div class="determinate" :style="'width: ' + size +'%'"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props:['size'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress {
    height: 6px !important;
}
</style>
