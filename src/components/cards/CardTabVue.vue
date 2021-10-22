<template>

  <div class="row">
    <div class="col s12">
      <div class="card z-depth-2">
      <ul class="tabs">
        <li class="tab col s6"><a href="#tab1" class="active">{{consultar || "Consultar"}}</a></li>
        <li class="tab col s6"><a href="#tab2">{{cadastrar || "Cadastrar"}}</a></li>
      </ul>
      </div>
    </div>

    <div id="tab1" class="col s12">
      <div class="card z-depth-4">
        <div class="card-content black-text">

          <table class="highlight responsive-table">
            
              <slot name="tabela"/>
           
          </table>

        </div>
        <div class="card-action center-align">

          <ul class="pagination">
              <slot name="pagination"/>
          </ul>

        </div>
      </div>
    </div>

    <div id="tab2" class="col s12">
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
  name: 'CardTabVue',
  components: {
  },
  props:['consultar','cadastrar','backpage','nextpage'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card {
    margin: 0 0 0 0 !important;
}

.borda {
  padding: 25px;
}

.row {
  margin-bottom: 35px !important;
}

</style>
