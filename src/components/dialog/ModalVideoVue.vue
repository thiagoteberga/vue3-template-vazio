<template>
    <span>
        <!-- Modal Structure -->
        <div :id="idmodal" class="modal modal-close no-autoinit">
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect btn-flat">
                <span class="material-icons">
                  close
                </span>
              </a>
            </div>
            <div class="modal-content">
              <slot/>
            </div>
        </div>
    </span>
</template>

<script>
export default {
  name: 'ModalVideoVue',
  props:['idmodal', 'titulo','detalhe'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal{
    max-height: 85%;
    
  }
</style>
