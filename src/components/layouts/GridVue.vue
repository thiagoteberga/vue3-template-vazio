<template>
    <div :class="'col ' + size">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'GridVue',
  props:['size'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media only screen and (max-width: 2400px){
  .margem-livro{
    padding:0px 0px 40px 0px !important;
  }
}

@media only screen and (max-width: 601px){
  .margem-livro{
    padding:0px 0px 30px 0px !important;
  }
}
</style>
