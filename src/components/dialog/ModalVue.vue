<template>
    <span>
        <!-- Modal Structure -->
        <div :id="idmodal" class="modal" style="z-index: 1050;">
            <div class="modal-content">
              <slot name="formulario"/>
            </div>
            <!--
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
            </div>
            -->
        </div>
    </span>
</template>

<script>
export default {
  name: 'ModalVue',
  props:['idmodal'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal{
    border-radius: 20px 20px 20px 20px !important;
  }
</style>
