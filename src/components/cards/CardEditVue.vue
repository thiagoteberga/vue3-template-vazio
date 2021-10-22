<template>

  <div class="row">

    <div class="col s12">
      <div class="card z-depth-4">
        <div class="card-content black-text">

          <span slot="slot2">
            <slot name="inputs"/>
          </span>

        </div>
      </div>
    </div>

  </div>

</template>

<script>

export default {
  name: 'CardEditVue',
  components: {
  },
  props:[],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row{
    max-width: 650px;
  }
  .card{
    border-radius: 20px 20px 20px 20px !important;
  }
</style>
